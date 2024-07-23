import { nextTick } from 'vue';
import { APP_DEFAULT_LOCALE, i18n, LOCALES } from '@/shared/config';
import type { Locale } from '../types';

type TranslationContent = Record<string, any>;
type TranslationPath = string;
type TranslationESM = { default: TranslationContent };

export const translationService = {
  get defaultLocale(): Locale {
    return APP_DEFAULT_LOCALE;
  },

  get currentLocale(): Locale {
    return i18n.global.locale.value;
  },

  set currentLocale(locale: Locale) {
    i18n.global.locale.value = locale;
    this.setPersistedLocale(locale);
  },

  get availableLocales() {
    return [...LOCALES];
  },

  isLocaleSupported(locale: Locale) {
    return !!this.availableLocales.find((l) => l === locale);
  },

  getCurrentInstance() {
    return i18n;
  },

  async fetchTranslations(pathsToMatch: Record<TranslationPath, () => Promise<TranslationESM>>, locale: Locale) {
    const localeRegex = new RegExp(`\\/${locale}\\/.*\\.json$`);

    const matchedPathsContent: Record<TranslationPath, TranslationContent> = {};

    for (const currentPath in pathsToMatch) {
      if (localeRegex.test(currentPath)) {
        const translationPath = currentPath.split(`/${locale}/`)[1].replace('.json', '');
        const content = await pathsToMatch[currentPath]();
        matchedPathsContent[translationPath] = content.default;
      }
    }

    return matchedPathsContent;
  },

  combineTranslations(translations: Record<TranslationPath, TranslationContent>) {
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
  },

  async loadTranslationMessages(locale: Locale) {
    if (!i18n.global.availableLocales.includes(locale)) {
      const localeJsonsPaths = import.meta.glob<TranslationESM>('@/shared/config/i18n/locales/**/*.json');

      const translations = await this.fetchTranslations(localeJsonsPaths, locale);
      const localeMessages = this.combineTranslations(translations);

      i18n.global.setLocaleMessage(locale, localeMessages);
    }

    return nextTick();
  },

  async switchLanguage(locale: Locale) {
    await this.loadTranslationMessages(locale);
    this.currentLocale = locale;
    document.querySelector('html')!.setAttribute('lang', locale);
  },

  getPersistedLocale(): Locale | null {
    const locale = localStorage.getItem('i18n-locale');
    return locale ? JSON.parse(locale) : null;
  },

  setPersistedLocale(locale: Locale) {
    localStorage.setItem('i18n-locale', JSON.stringify(locale));
  },

  applyPersistedLocaleIfExists() {
    const locale = translationService.getPersistedLocale();

    if (!locale) {
      this.currentLocale = this.defaultLocale;
      return;
    }

    const isLocaleSupported = this.isLocaleSupported(locale);
    this.currentLocale = isLocaleSupported ? locale : this.defaultLocale;
  }
};
