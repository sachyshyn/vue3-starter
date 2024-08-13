import type { Locale } from '../../types';
import type { TranslationContent, TranslationESM, TranslationPath } from './types';

function createLocaleRegex(locale: Locale) {
  return new RegExp(`\\/${locale}\\/.*\\.json$`);
}

function extractTranslationPath(path: TranslationPath, locale: Locale): Partial<TranslationPath> {
  return path.split(`/${locale}/`)[1].replace('.json', '');
}

async function fetchTranslations(pathsToMatch: Record<TranslationPath, () => Promise<TranslationESM>>, locale: Locale) {
  const localeRegex = createLocaleRegex(locale);

  const matchedPathsContent: Record<TranslationPath, TranslationContent> = {};

  for (const currentPath in pathsToMatch) {
    if (localeRegex.test(currentPath)) {
      const translationPath = extractTranslationPath(currentPath, locale);
      const content = await pathsToMatch[currentPath]();
      matchedPathsContent[translationPath] = content.default;
    }
  }

  return matchedPathsContent;
}

function combineTranslations(translations: Record<TranslationPath, TranslationContent>) {
  const combinedTranslations: Record<Partial<TranslationPath>, TranslationContent> = {};

  for (const translationPath in translations) {
    const translationKeys = translationPath.split('/');
    let currentNestingLevel = combinedTranslations;

    translationKeys.forEach((key, index) => {
      if (index === translationKeys.length - 1) {
        currentNestingLevel[key] = translations[translationPath];
      } else {
        currentNestingLevel[key] = currentNestingLevel[key] || {};
        currentNestingLevel = currentNestingLevel[key];
      }
    });
  }

  return combinedTranslations;
}

export const localeHelper = {
  async loadTranslationMessages(locale: Locale) {
    const localeJsonsPaths = import.meta.glob<TranslationESM>('@/shared/i18n/locales/**/*.json');

    const translations = await fetchTranslations(localeJsonsPaths, locale);
    const localeMessages = combineTranslations(translations);

    return localeMessages;
  }
};
