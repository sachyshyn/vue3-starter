import { nextTick } from 'vue';
import { APP_DEFAULT_LOCALE, i18n, LOCALES } from '@/shared/config';
import type { Locale, LocaleMessages } from '../types';

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

  async loadTranslationMessages(locale: Locale) {
    if (!i18n.global.availableLocales.includes(locale)) {
      const localeJsonsPaths = import.meta.glob('@/shared/config/i18n/locales/**/*.json');
      const localeRegex = new RegExp(`\\/${locale}\\/.*\\.json$`);

      const messages: Partial<LocaleMessages> = {
        [locale]: {}
      };

      for (const path in localeJsonsPaths) {
        if (localeRegex.test(path)) {
          const fileContent = (await localeJsonsPaths[path]()) as { default: Record<string, any> };

          const nestedPath = path.split(`/${locale}/`)[1].replace('.json', '');

          const keys = nestedPath.split('/');

          keys.reduce((acc, key, index) => {
            // Ensure the current level is an object
            if (!acc[key]) {
              acc[key] = {};
            }

            // If it's the last key, set the value
            if (index === keys.length - 1) {
              acc[key] = fileContent.default;
            }

            return acc[key];
          }, messages[locale]);
        }
      }

      i18n.global.setLocaleMessage(locale, messages[locale]);
    }

    return nextTick();
  },

  async switchLanguage(locale: Locale) {
    await this.loadTranslationMessages(locale);
    this.currentLocale = locale;
    document.querySelector('html')!.setAttribute('lang', locale);
  }
};
