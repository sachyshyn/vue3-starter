import { translationService, type Application } from '@/shared/lib';

export function withTranslationProvider(app: Application) {
  translationService.applyPersistedLocaleIfExists();

  app.use(translationService.getCurrentInstance());
}
