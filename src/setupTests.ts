import '@testing-library/jest-dom';
import { IDBFactory } from 'fake-indexeddb';

// Provide a fresh IndexedDB instance before every test to guarantee isolation.
beforeEach(() => {
  global.indexedDB = new IDBFactory();
});

// Polyfill crypto.randomUUID — jsdom does not expose it by default.
import { randomUUID } from 'crypto';
Object.defineProperty(global, 'crypto', {
  value: { randomUUID },
  writable: true,
});

// Stub window.matchMedia — jsdom does not implement it.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
