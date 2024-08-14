import { createI18n } from 'vue-i18n';

export const LOCALES = ['en', 'ru'] as const;

export type Locale = (typeof LOCALES)[number];

export const APP_DEFAULT_LOCALE: Locale = 'en';

export const i18n = createI18n({
  legacy: false,
  locale: APP_DEFAULT_LOCALE,
  fallbackLocale: APP_DEFAULT_LOCALE,
  messages: {} as Record<Locale, any>
});

export const PERSISTED_LOCALE_KEY = 'i18n-locale';
