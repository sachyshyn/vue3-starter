import { createI18n } from 'vue-i18n';
import type { LocaleMessages } from '@/shared/lib';

export const LOCALES = ['en', 'ru'] as const;
export const APP_DEFAULT_LOCALE = 'en';

export const i18n = createI18n({
  legacy: false,
  locale: APP_DEFAULT_LOCALE,
  fallbackLocale: 'en',
  messages: {} as LocaleMessages
});
