import { APP_DEFAULT_LOCALE } from '@/shared/config';

import { type Application, type LocaleMessage } from '@/shared/lib';
import { createI18n } from 'vue-i18n';

export function createTranslationProvider(app: Application) {
  const i18n = createI18n({
    legacy: false,
    locale: APP_DEFAULT_LOCALE,
    fallbackLocale: 'en',
    messages: {} as LocaleMessage
  });

  app.use(i18n);
}
