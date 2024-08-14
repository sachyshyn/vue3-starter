import { translationService } from '@/shared/lib';
import type { Locale } from '@/shared/i18n';
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
