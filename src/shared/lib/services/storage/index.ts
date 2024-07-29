import { isNullish } from '../../utils';

import type { IStorageService } from '../../types';

export class StorageService implements IStorageService {
  constructor(private readonly storage: Storage) {}

  get<T>(key: string): T | null;
  get<T>(key: string, fallback: T): T;
  get<T>(key: string, fallback?: T) {
    const storedValue = this.storage.getItem(key) as string;

    if (!isNullish(storedValue)) {
      return JSON.parse(storedValue);
    }

    if (fallback) {
      return fallback;
    }

    return null;
  }

  set<T>(key: string, value: T) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
