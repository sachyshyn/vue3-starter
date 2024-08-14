import { type App } from 'vue';

export type Application = App<Element>;

export interface IStorageService {
  get<T>(key: string): T | null;
  get<T>(key: string, fallback: T): T;
  get<T>(key: string, fallback?: T): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}
