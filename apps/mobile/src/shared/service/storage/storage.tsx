import { MMKV } from 'react-native-mmkv';

export const storageClient = new MMKV();

function getItem<T>(key: string): T {
  const value = storageClient.getString(key);
  return value ? JSON.parse(value) || null : null;
}

async function setItem<T>(key: string, value: T) {
  storageClient.set(key, JSON.stringify(value));
}

async function removeItem(key: string) {
  storageClient.delete(key);
}

export const Storage = {
  getItem,
  setItem,
  removeItem,
};
