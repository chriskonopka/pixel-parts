export interface SetDBConfig {
    dbName: string;
    storeName: string
}

export const setDbConfig = (webpartName: string, pageId?: number | string): SetDBConfig => {
    const isStagingSite = window.location.pathname.toLowerCase().includes('staging');
    const envIdentifier = isStagingSite ? '_Staging' : '';

    const uniquiPageId = pageId ? `_${pageId}` : '';

    const normalizedName = webpartName.replace('WebPart', '');

    const sessionIdKey = isStagingSite ? 'MAI-Staging-SessionId' : 'MAI-SessionId';
    const sessionIdFromStorage = sessionStorage.getItem(sessionIdKey);

    const dbSessionId = sessionIdFromStorage ? `_${sessionIdFromStorage}` : '';

    return {
        dbName: `MAI_${normalizedName}${envIdentifier}${uniquiPageId}${dbSessionId}`,
        storeName: 'Chat_History'
    };
};

export default class IndexedDBClient {
    private DB_NAME;
    private DB_VERSION;

    constructor(dbName: string) {
        this.DB_NAME = dbName;
        this.DB_VERSION = 1;
    }

    public open(storeName: string): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            if (!storeName) {
                reject(new Error("Store name is required"));
                return;
            }

            try {
                const request = indexedDB.open(this.DB_NAME);
          
                request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                    try {
                        const db = event.target as IDBOpenDBRequest;
                        const result = db.result;
        
                        if (!result.objectStoreNames.contains(storeName)) {
                            result.createObjectStore(storeName, { keyPath: "key" });
                        }
                    } catch (err) {
                        console.error("Error during database upgrade:", err);
                        reject(new Error(`Failed to upgrade database: ${err.message}`));
                    }
                };
          
                request.onsuccess = (event: Event) => {
                    resolve((event.target as IDBOpenDBRequest).result);
                };
          
                request.onerror = (event: Event) => {
                    console.error("Database open error:", (event.target as IDBOpenDBRequest).error);
                    reject(new Error(`Error opening database: ${(event.target as IDBOpenDBRequest).error}`));
                };

                request.onblocked = (event: Event) => {
                    console.error("Database blocked event:", event);
                    reject(new Error("Database is blocked. Please close other tabs with this application open."));
                };
            } catch (err) {
                console.error("Unexpected error opening database:", err);
                reject(new Error(`Unexpected error opening IndexedDB: ${err.message}`));
            }
        });
    }

    public async removeAllButFirst(storeName: string): Promise<void> {
        if (!storeName) {
            throw new Error("Store name is required");
        }

        try {
            const db = await this.open(storeName);

            return new Promise((resolve, reject) => {
                try {
                    const transaction = db.transaction(storeName, "readwrite");
                    const store = transaction.objectStore(storeName);

                    const request = store.getAll();

                    request.onsuccess = () => {
                        const allItems = request.result;

                        if (allItems.length > 1) {
                            allItems.slice(1).forEach(item => {
                                store.delete(item.key);
                            });
                        }

                        resolve();
                    };

                    request.onerror = (event: Event) => {
                        const error = (event.target as IDBRequest).error;
                        console.error("Error retrieving items for removal:", error);
                        reject(new Error(`Failed to retrieve items: ${error}`));
                    };

                    transaction.oncomplete = () => {
                        db.close();
                    };

                    transaction.onerror = (event: Event) => {
                        const error = (event.target as IDBTransaction).error;
                        console.error("Transaction error during removeAllButFirst:", error);
                        reject(new Error(`Transaction failed during removeAllButFirst: ${error}`));
                    };
                } catch (err) {
                    console.error("Error during removeAllButFirst operation:", err);
                    reject(new Error(`Error during removeAllButFirst: ${err.message}`));
                }
            });
        } catch (err) {
            console.error("Failed to open database for removeAllButFirst:", err);
            throw new Error(`Failed to open database for removeAllButFirst: ${err.message}`);
        }
    }

    public async insert<T>(storeName: string, data: T): Promise<void> {
        if (!storeName) {
            throw new Error("Store name is required");
        }
        
        if (!data) {
            throw new Error("Data is required for insertion");
        }

        try {
            const db = await this.open(storeName);
            
            return new Promise((resolve, reject) => {
                try {
                    const transaction = db.transaction(storeName, "readwrite");
                    const store = transaction.objectStore(storeName);
                    
                    const record = {
                      key: `prompt_${new Date().getTime()}`
                    };

                    Object.entries(data).forEach(([key, value]) => {
                        const fileList: File[] = [];

                        if (key === 'files') {
                            for (const file of data[key]) {
                                fileList.push(file);
                            }
                            record[key] = fileList;
                        } else {
                            record[key] = value;
                        }
                    });
                  
                    const request = store.put(record);

                    request.onsuccess = () => {
                        resolve();
                    };

                    request.onerror = (event: Event) => {
                        const error = (event.target as IDBRequest).error;
                        console.error("Error inserting data:", error);
                        reject(new Error(`Failed to insert data: ${error}`));
                    };

                    transaction.oncomplete = () => {
                        db.close();
                    };

                    transaction.onerror = (event: Event) => {
                        const error = (event.target as IDBTransaction).error;
                        console.error("Transaction error:", error);
                        reject(new Error(`Transaction failed: ${error}`));
                    };
                } catch (err) {
                    console.error("Error during data insertion:", err);
                    reject(new Error(`Error during data insertion: ${err.message}`));
                }
            });
        } catch (err) {
            console.error("Failed to open database for insertion:", err);
            throw new Error(`Failed to open database for insertion: ${err.message}`);
        }
    }

    public async updateItem<T>(storeName: string, data: T): Promise<void> {
        if (!storeName) {
            throw new Error("Store name is required");
        }   

        if (!data) {
            throw new Error("Data is required for update");
        }

        try {
            const db = await this.open(storeName);
            
            return new Promise((resolve, reject) => {
                try {
                    const transaction = db.transaction(storeName, "readwrite");
                    const store = transaction.objectStore(storeName);
                    const request = store.put(data);

                    request.onsuccess = () => {
                        resolve();
                    };

                    request.onerror = (event: Event) => {
                        const error = (event.target as IDBRequest).error;
                        console.error("Error updating data:", error);
                        reject(new Error(`Failed to update data: ${error}`));
                    };

                    transaction.oncomplete = () => {
                        db.close();
                    };

                    transaction.onerror = (event: Event) => {
                        const error = (event.target as IDBTransaction).error;
                        console.error("Transaction error:", error);
                        reject(new Error(`Transaction failed: ${error}`));
                    };
                } catch (err) {
                    console.error("Error during data update:", err);
                    reject(new Error(`Error during data update: ${err.message}`));
                }
            });
        } catch (err) {
            console.error("Failed to open database for update:", err);
            throw new Error(`Failed to open database for update: ${err.message}`);
        }
    }

    public async get<T = any>(storeName: string, key: string): Promise<T | null> {
        if (!storeName) {
            throw new Error("Store name is required");
        }

        if (!key) {
            throw new Error("Key is required for retrieval");
        }

        try {
            const db = await this.open(storeName);

            return new Promise((resolve, reject) => {
                try {
                    const transaction = db.transaction(storeName, 'readonly');
                    const store = transaction.objectStore(storeName);
                    const request = store.get(key);

                    request.onsuccess = () => {
                        resolve(request.result);
                        db.close();
                    };

                    request.onerror = (event: Event) => {
                        const error = (event.target as IDBRequest).error;
                        console.error("Error retrieving data:", error);
                        reject(new Error(`Failed to retrieve data: ${error}`));
                    };

                    transaction.onerror = (event: Event) => {
                        const error = (event.target as IDBTransaction).error;
                        console.error("Transaction error during get:", error);
                        reject(new Error(`Transaction failed during get: ${error}`));
                    };
                } catch (err) {
                    console.error("Error during data retrieval:", err);
                    reject(new Error(`Error during data retrieval: ${err.message}`));
                }
            });
        } catch (err) {
            console.error("Failed to open database for retrieval:", err);
            throw new Error(`Failed to open database for retrieval: ${err.message}`);
        }
    }

    public async getAll<T = any>(storeName: string): Promise<T[]> {
        if (!storeName) {
            throw new Error("Store name is required");
        }
        
        try {
            const db = await this.open(storeName);

            return new Promise((resolve, reject) => {
                try {
                    const transaction = db.transaction(storeName, 'readonly');
                    const store = transaction.objectStore(storeName);
                    const request = store.getAll();

                    request.onsuccess = () => {
                        resolve(request.result);
                        db.close();
                    };

                    request.onerror = (event: Event) => {
                        const error = (event.target as IDBRequest).error;
                        console.error("Error retrieving data:", error);
                        reject(new Error(`Failed to retrieve data: ${error}`));
                    };

                    transaction.onerror = (event: Event) => {
                        const error = (event.target as IDBTransaction).error;
                        console.error("Transaction error during getAll:", error);
                        reject(new Error(`Transaction failed during getAll: ${error}`));
                    };
                } catch (err) {
                    console.error("Error during data retrieval:", err);
                    reject(new Error(`Error during data retrieval: ${err.message}`));
                }
            });
        } catch (err) {
            console.error("Failed to open database for retrieval:", err);
            throw new Error(`Failed to open database for retrieval: ${err.message}`);
        }
    }

    public async deleteItem(storeName: string, key: string): Promise<void> {
        if (!storeName) {
            throw new Error("Store name is required");
        }

        if (!key) {
            throw new Error("Key is required for deletion");
        }

        try {
            const db = await this.open(storeName);

            return new Promise((resolve, reject) => {
                try {
                    const transaction = db.transaction(storeName, 'readwrite');
                    const store = transaction.objectStore(storeName);
                    const request = store.delete(key);

                    request.onsuccess = () => {
                        resolve();
                        db.close();
                    };

                    request.onerror = (event: Event) => {
                        const error = (event.target as IDBRequest).error;
                        console.error("Error deleting data:", error);
                        reject(new Error(`Failed to delete data: ${error}`));
                    };

                    transaction.onerror = (event: Event) => {
                        const error = (event.target as IDBTransaction).error;
                        console.error("Transaction error during delete:", error);
                        reject(new Error(`Transaction failed during delete: ${error}`));
                    };
                } catch (err) {
                    console.error("Error during data deletion:", err);
                    reject(new Error(`Error during data deletion: ${err.message}`));
                }
            });
        } catch (err) {
            console.error("Failed to open database for deletion:", err);
            throw new Error(`Failed to open database for deletion: ${err.message}`);
        }
    }

    public deleteDatabase(): void {
        indexedDB.deleteDatabase(this.DB_NAME);
    }

    public async deleteDatabases(dbNamePrefix: string): Promise<void> {
        if (!indexedDB.databases) {
          console.warn("indexedDB.databases() is not supported in this browser.");
          return;
        }
      
        const databases = await indexedDB.databases();
      
        for (const dbInfo of databases) {
          if (dbInfo.name && dbInfo.name.startsWith(dbNamePrefix)) {
            console.log(`Deleting database: ${dbInfo.name}`);
            indexedDB.deleteDatabase(dbInfo.name);
          }
        }
    }

    public async initializeStore(storeName: string): Promise<void> {
        if (!storeName) {
            throw new Error("Store name is required");
        }
        
        try {
            const db = await this.open(storeName);
            
            return new Promise((resolve, reject) => {
                try {
                    if (!db.objectStoreNames.contains(storeName)) {
                        db.close();
                        const newVersion = this.DB_VERSION + 1;
                        this.DB_VERSION = newVersion;
                        
                        const upgradeRequest = indexedDB.open(this.DB_NAME, newVersion);
                        
                        upgradeRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
                            try {
                                const upgradedDb = (event.target as IDBOpenDBRequest).result;
                                upgradedDb.createObjectStore(storeName, { keyPath: "key" });
                                console.log(`Store '${storeName}' created successfully`);
                            } catch (err) {
                                console.error(`Error creating store '${storeName}':`, err);
                                reject(new Error(`Failed to create store: ${err.message}`));
                            }
                        };
                        
                        upgradeRequest.onsuccess = () => {
                            resolve();
                        };
                        
                        upgradeRequest.onerror = (event: Event) => {
                            const error = (event.target as IDBOpenDBRequest).error;
                            console.error("Error upgrading database:", error);
                            reject(new Error(`Failed to upgrade database: ${error}`));
                        };
                        
                        return;
                    }
                    
                    const transaction = db.transaction(storeName, "readwrite");
                    const store = transaction.objectStore(storeName);
                    const clearRequest = store.clear();
                    
                    clearRequest.onsuccess = () => {
                        console.log(`Store '${storeName}' cleared successfully`);
                        resolve();
                    };
                    
                    clearRequest.onerror = (event: Event) => {
                        const error = (event.target as IDBRequest).error;
                        console.error("Error clearing store:", error);
                        reject(new Error(`Failed to clear store: ${error}`));
                    };
                    
                    transaction.oncomplete = () => {
                        db.close();
                    };
                    
                    transaction.onerror = (event: Event) => {
                        const error = (event.target as IDBTransaction).error;
                        console.error("Transaction error during initializeStore:", error);
                        reject(new Error(`Transaction failed during initializeStore: ${error}`));
                    };
                } catch (err) {
                    console.error("Error during store clearing:", err);
                    reject(new Error(`Error during store clearing: ${err.message}`));
                }
            });
        } catch (err) {
            console.error("Failed to open database for clearing store:", err);
            throw new Error(`Failed to open database for clearing store: ${err.message}`);
        }
    }
}