import { i18n } from '@/shared/config';
import { type Application } from '@/shared/lib';

export function withTranslationProvider(app: Application) {
  app.use(i18n);
}
