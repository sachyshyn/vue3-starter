import { i18n } from '@/shared/config/i18n/init';
import { type Application } from '@/shared/lib';

export function createTranslationProvider(app: Application) {
  app.use(i18n);
}
