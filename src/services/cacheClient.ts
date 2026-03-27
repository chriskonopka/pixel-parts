/* eslint-disable @rushstack/no-new-null */

const DB_NAME = `MWS.AppCache`;
const STORE_NAME = 'appData';
const DB_VERSION = 1;
const DEFAULT_TTL_MS = 15 * 60 * 1000; // 15 minutes

export type CacheValue =
  | string
  | number
  | boolean
  | Record<string, unknown>
  | unknown[]
  | Blob
  | File
  | FileList
  | Map<any, any>
  | Set<any>
  | ArrayBuffer
  | undefined
  | null;

export interface CacheEntry<T = CacheValue> {
  key: string;
  value: T;
  createdAt: number;
  updatedAt: number;
  expiresAt: number;
  siteId?: string;
}

// Helpers
// -------------------------

// Determines a unique site identifier for scoping cache entries
function getCurrentSiteId(): string {
  // Get name after `/sites/<name>` in URL path
  const path = window.location?.pathname ?? '';
  const m = path.match(/\/sites\/([^/]+)/i);
  if (m?.[1]) {
    return `site/${decodeURIComponent(m[1]).toLowerCase()}`;
  }

  // Hostname fallback
  return `host/${window.location?.hostname?.toLowerCase() ?? 'unknown'}`;
}

const SITE_ID = getCurrentSiteId();

const makeScopedKey = (key: string): string => `${SITE_ID}/${key}`;

// Memoized singleton to avoid reopening the DB on every call
let dbPromise: Promise<IDBDatabase> | null = null;

// Opens (or creates) the IndexedDB database
const openDb = (): Promise<IDBDatabase> => {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        let store: IDBObjectStore;

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          store = db.createObjectStore(STORE_NAME, { keyPath: 'key' });
          store.createIndex('bySite', 'siteId', { unique: false });
        } else {
          store = (req.transaction as IDBTransaction).objectStore(STORE_NAME);

          if (!store.indexNames.contains('bySite')) {
            store.createIndex('bySite', 'siteId', { unique: false });
          }
        }
      };
      req.onsuccess = () => {
        const db = req.result;
        // Reset promise if DB version changes
        db.onversionchange = () => {
          try {
            db.close();
          } catch {
            // Intentionally empty
          }
          dbPromise = null;
        };
        resolve(db);
      };
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
};

// Helper to open a transaction and get the object store
// --------------------------------------------------

// Added optional 'durability: relaxed' for faster writes on Chromium browsers
type TxDurability = 'default' | 'relaxed' | 'strict';

const transactionStore = (
  db: IDBDatabase,
  mode: IDBTransactionMode = 'readonly',
  opts?: { durability?: TxDurability }
): { transaction: IDBTransaction; store: IDBObjectStore } => {
  const transaction =
    (db as any).transaction.length >= 3
      ? (db as any).transaction(STORE_NAME, mode, opts)
      : db.transaction(STORE_NAME, mode);

  return { transaction, store: transaction.objectStore(STORE_NAME) };
};

// Converts IDBRequest to Promise
// Acts as bridge between IndexedDB’s old-school event-based API and modern async/await style
// --------------------------------------------------
const reqToPromise = <T>(req: IDBRequest<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result as T);
    req.onerror = () => reject(req.error);
  });
}

// Waits for transaction to complete. It returns a Promise that resolves when the 
// transaction completes successfully and rejects if it fails or is aborted.
// --------------------------------------------------
const waitForTx = (tx: IDBTransaction): Promise<void> => {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error ?? new DOMException('Transaction aborted'));
  });
}

// Public API
// --------------------------------------------------

// Save or update an item in cache.
const setItem = async <T = CacheValue>(
  key: string,
  value: T,
  expiry: number = DEFAULT_TTL_MS
): Promise<number> => {
  try {
    const db = await openDb();

    // Use relaxed durability for faster writes if supported
    const { transaction, store } = transactionStore(db, 'readwrite', { durability: 'relaxed' });
    const now = Date.now();
    const entry: CacheEntry<T> = {
      key: makeScopedKey(key),
      value,
      createdAt: now,
      updatedAt: now,
      expiresAt: now + expiry,
      siteId: SITE_ID,
    };

    await reqToPromise(store.put(entry as unknown as CacheEntry));
    await waitForTx(transaction);

    return entry.expiresAt;
  } catch (error) {
    console.error('IndexedDB setItem failed:', error);
    throw new Error(`Failed to save cache item "${key}" to IndexedDB.`);
  }
};

// Retrieve a cached item (auto-removes if expired)
const getItem = async <T = CacheValue>(key: string): Promise<T | null> => {
  try {
    const db = await openDb();

    // Fast readonly lookup
    {
      const { store } = transactionStore(db, 'readonly');
      const scopedKey = makeScopedKey(key);
      const entry = (await reqToPromise(store.get(scopedKey))) as CacheEntry<T> | undefined;

      if (entry) {
        const now = Date.now();
        if (entry.expiresAt > now) {
          return entry.value;
        }
      }
    }

    // Expired or missing: delete the key if it exists
    const { transaction, store } = transactionStore(db, 'readwrite', { durability: 'relaxed' });
    await reqToPromise(store.delete(makeScopedKey(key)));
    await waitForTx(transaction);

    return null;
  } catch (error) {
    console.error('IndexedDB getItem failed:', error);
    return null; // fail silently; treat as cache miss
  }
};

// Remove a specific cache item
const deleteItem = async (key: string): Promise<void> => {
  try {
    const db = await openDb();
    const { transaction, store } = transactionStore(db, 'readwrite', { durability: 'relaxed' });
    await reqToPromise(store.delete(makeScopedKey(key)));
    await waitForTx(transaction);
  } catch (error) {
    console.error('IndexedDB deleteItemFrom failed:', error);
    throw new Error(`Failed to delete cache item "${key}" from IndexedDB.`);
  }
};

// Deletes all expired cache items (all sites)
const deleteExpiredItems = async (): Promise<number> => {
  try {
    const db = await openDb();
    const { transaction, store } = transactionStore(db, 'readwrite', { durability: 'relaxed' });
    const index = store.index('bySite');
    const now = Date.now();
    let count = 0;

    await new Promise<void>((resolve, reject) => {
      const cursorReq = index.openCursor(IDBKeyRange.only(SITE_ID));
      cursorReq.onerror = () => reject(cursorReq.error);
      cursorReq.onsuccess = () => {
        const cursor = cursorReq.result as IDBCursorWithValue | null;
        if (cursor) {
          const entry = cursor.value as CacheEntry;
          if (entry.expiresAt <= now) {
            cursor.delete();
            count++;
          }
          cursor.continue();
        } else {
          resolve();
        }
      };
    });

    await waitForTx(transaction);
    return count;
  } catch (error) {
    console.error('IndexedDB deleteAllExpiredItems failed:', error);
    throw new Error(`Failed to delete expired cache items for site "${SITE_ID}".`);
  }
};

// Deletes all items for the current site only (regardless of whether expired or not)
const deleteAllItems = async (): Promise<number> => {
  try {
    const db = await openDb();
    const { transaction, store } = transactionStore(db, 'readwrite', { durability: 'relaxed' });
    const index = store.index('bySite');
    let count = 0;

    await new Promise<void>((resolve, reject) => {
      const cursorReq = index.openCursor(IDBKeyRange.only(SITE_ID));
      cursorReq.onerror = () => reject(cursorReq.error);
      cursorReq.onsuccess = () => {
        const cursor = cursorReq.result as IDBCursorWithValue | null;
        if (cursor) {
          cursor.delete();
          count++;
          cursor.continue();
        } else {
          resolve();
        }
      };
    });

    await waitForTx(transaction);
    return count;
  } catch (error) {
    console.error('IndexedDB clearCurrentSite failed:', error);
    throw new Error(`Failed to clear cache items for site "${SITE_ID}".`);
  }
};

export const cacheClient = {
  setItem,
  getItem,
  deleteItem,
  deleteExpiredItems,
  deleteAllItems,
};