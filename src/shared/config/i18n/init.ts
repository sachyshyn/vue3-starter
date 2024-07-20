import { createI18n } from 'vue-i18n';
import { APP_DEFAULT_LOCALE } from '../env';
import type { LocaleMessages } from '@/shared/lib';

export const i18n = createI18n({
  legacy: false,
  locale: APP_DEFAULT_LOCALE,
  fallbackLocale: 'en',
  messages: {} as LocaleMessages
});
