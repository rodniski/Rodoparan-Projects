import { openDB } from 'idb';

const DB_NAME = 'rodoAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'rodoAppStore';

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const saveData = async (key: string, data: any) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.put({ id: key, data });
  await tx.done;
  console.log(`Dados salvos no IndexedDB com a chave ${key}:`, data); // Log dos dados salvos
};

export const getData = async (key: string) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const result = await store.get(key);
  console.log(`Dados recuperados do IndexedDB com a chave ${key}:`, result?.data); 
  return result?.data || [];
};

// Função para limpar dados do IndexedDB
export const clearData = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  await store.clear();
  await tx.done;
  console.log("Dados do IndexedDB limpos.");
};

// Funções específicas para o token
export const setToken = async (token: string) => {
  await saveData('token', token);
};

export const getToken = async () => {
  return await getData('token');
};
