import { translationConfig } from '@/shared/config';
import { StorageService } from './storage';
import { TranslationService } from './translation';

// it's possible to create sessionStorageService too
export const localStorageService = new StorageService(localStorage);
export const translationService = new TranslationService(translationConfig, localStorageService);
