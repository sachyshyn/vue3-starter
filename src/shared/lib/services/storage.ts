import { isNullish } from '../utils';

export class StorageService {
  constructor(private readonly storage: Storage) {}

  get<T>(key: string): T | null {
    const storedValue = this.storage.getItem(key) as string;

    if (isNullish(storedValue)) {
      return null;
    }

    return JSON.parse(storedValue);
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
