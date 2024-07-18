import { ru, en } from '@/shared/config/locales';
import { type Application } from '@/shared/lib';
import { createI18n } from 'vue-i18n';

export function createTranslationProvider(app: Application) {
  const i18n = createI18n({
    legacy: false,
    locale: 'ru',
    fallbackLocale: 'en',
    messages: {
      ru,
      en
    }
  });

  app.use(i18n);
}
