import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({ id: 'supabase-storage' });

export const mmkvStorageConfigSupabase = {
  setItem: (key, data) => storage.set(key, data),
  getItem: (key) => storage.getString(key),
  removeItem: (key) => storage.delete(key),
};

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}
