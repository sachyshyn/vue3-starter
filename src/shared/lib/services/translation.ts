import { nextTick } from 'vue';
import { APP_DEFAULT_LOCALE, LOCALES } from '@/shared/config';
import type { translationConfig as TranslationConfig } from '@/shared/config';
import type { StorageService } from './storage';
import type { Locale } from '../types';
import { PERSISTED_LOCALE_KEY } from '../constants';

type TranslationContent = Record<string, any>;
type TranslationPath = string;
type TranslationESM = { default: TranslationContent };

export class TranslationService {
  constructor(
    private readonly i18n: typeof TranslationConfig,
    private readonly storageService: StorageService
  ) {}

  get defaultLocale(): Locale {
    return APP_DEFAULT_LOCALE;
  }

  get currentLocale(): Locale {
    return this.i18n.global.locale.value;
  }

  set currentLocale(locale: Locale) {
    this.i18n.global.locale.value = locale;

    this.updateLocaleSettings(locale);
  }

  get availableLocales() {
    return [...LOCALES];
  }

  isLocaleSupported(locale: Locale) {
    return !!this.availableLocales.find((l) => l === locale);
  }

  getCurrentInstance(): typeof TranslationConfig {
    return this.i18n;
  }

  private createLocaleRegex(locale: Locale) {
    return new RegExp(`\\/${locale}\\/.*\\.json$`);
  }

  private extractTranslationPath(path: TranslationPath, locale: Locale): Partial<TranslationPath> {
    return path.split(`/${locale}/`)[1].replace('.json', '');
  }

  private async fetchTranslations(
    pathsToMatch: Record<TranslationPath, () => Promise<TranslationESM>>,
    locale: Locale
  ) {
    const localeRegex = this.createLocaleRegex(locale);

    const matchedPathsContent: Record<TranslationPath, TranslationContent> = {};

    for (const currentPath in pathsToMatch) {
      if (localeRegex.test(currentPath)) {
        const translationPath = this.extractTranslationPath(currentPath, locale);
        const content = await pathsToMatch[currentPath]();
        matchedPathsContent[translationPath] = content.default;
      }
    }

    return matchedPathsContent;
  }

  private combineTranslations(translations: Record<TranslationPath, TranslationContent>) {
    const combinedTranslations: Record<Partial<TranslationPath>, TranslationContent> = {};

    for (const translationPath in translations) {
      const translationKeys = translationPath.split('/');

      let currentNestingLevel = combinedTranslations;

      for (let index = 0; index < translationKeys.length; index++) {
        const key = translationKeys[index];

        // If it's the last key, set the value and skip this iteration
        if (index === translationKeys.length - 1) {
          currentNestingLevel[key] = translations[translationPath];
          continue;
        }

        // Ensure the current level is an object
        if (!currentNestingLevel[key]) {
          currentNestingLevel[key] = {};
        }

        // Move to the next level
        currentNestingLevel = currentNestingLevel[key];
      }
    }

    return combinedTranslations;
  }

  async loadTranslationMessages(locale: Locale) {
    if (!this.i18n.global.availableLocales.includes(locale)) {
      const localeJsonsPaths = import.meta.glob<TranslationESM>('@/shared/config/i18n/locales/**/*.json');

      const translations = await this.fetchTranslations(localeJsonsPaths, locale);
      const localeMessages = this.combineTranslations(translations);

      this.i18n.global.setLocaleMessage(locale, localeMessages);
    }

    return nextTick();
  }

  async switchLanguage(locale: Locale) {
    await this.loadTranslationMessages(locale);
    this.currentLocale = locale;
  }

  private getPersistedLocale() {
    return this.storageService.get<Locale>(PERSISTED_LOCALE_KEY);
  }

  private setPersistedLocale(locale: Locale) {
    this.storageService.set(PERSISTED_LOCALE_KEY, locale);
  }

  applyPersistedLocaleIfExists() {
    const locale = this.getPersistedLocale();

    if (!locale) {
      this.currentLocale = this.defaultLocale;
      return;
    }

    const isLocaleSupported = this.isLocaleSupported(locale);
    this.currentLocale = isLocaleSupported ? locale : this.defaultLocale;
  }

  private updateLocaleSettings(locale: Locale) {
    this.setPersistedLocale(locale);
    document.querySelector('html')?.setAttribute('lang', locale);
  }
}
