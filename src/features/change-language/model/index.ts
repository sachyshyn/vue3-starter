import { translationService, type Locale } from '@/shared/lib';
import { computed } from 'vue';

export function useChangeLanguageModel() {
  return computed({
    get(): Locale {
      return translationService.currentLocale;
    },
    set(locale: Locale) {
      translationService.switchLanguage(locale);
    }
  });
}
