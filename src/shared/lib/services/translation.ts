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
  },

  get availableLocales() {
    return [...LOCALES];
  },

  async fetchTranslations(
    pathsToMatch: Record<TranslationPath, () => Promise<TranslationESM>>,
    locale: Locale
  ) {
    const localeRegex = new RegExp(`\\/${locale}\\/.*\\.json$`);

    const matchedPathsContent: Record<string, TranslationContent> = {};

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
      const keys = translationPath.split('/');

      keys.reduce((acc, key, index) => {
        // Ensure the current level is an object
        if (!acc[key]) {
          acc[key] = {};
        }

        // If it's the last key, set the value
        if (index === keys.length - 1) {
          acc[key] = translations[translationPath];
        }

        return acc[key];
      }, combinedTranslations);
    }

    return combinedTranslations;
  },

  async loadTranslationMessages(locale: Locale) {
    if (!i18n.global.availableLocales.includes(locale)) {
      const localeJsonsPaths = import.meta.glob<TranslationESM>(
        '@/shared/config/i18n/locales/**/*.json'
      );

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
  }
};
