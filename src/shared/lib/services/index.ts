import { StorageService } from './storage';

export { translationService } from './translation';
export const localStorageService = new StorageService(localStorage);
export const sessionStorageService = new StorageService(sessionStorage);
