import type { Locale, LocaleMessage } from './types';

export async function loadTranslationMessages(locale: Locale) {
  const localeJsonsPaths = import.meta.glob('@/shared/config/locales/**/*.json');
  const localeRegex = new RegExp(`\\/${locale}\\/.*\\.json$`);

  const messages: Partial<LocaleMessage> = {
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

  return messages;
}
