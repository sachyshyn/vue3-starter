import type { Locale } from '@/shared/i18n';

export const localeHelper = {
  async loadTranslationMessages(locale: Locale) {
    const localeMessages = await import(`@/shared/i18n/locales/${locale}.json`);

    return localeMessages;
  }
};
