import { withRouterProvider } from './router';
import { withStoreProvider } from './store';
import { withTranslationProvider } from './translation';
import type { Application } from '@/shared/lib';

export function applyProviders(app: Application) {
  const providers = [withStoreProvider, withRouterProvider, withTranslationProvider];

  providers.forEach((withProvider) => {
    withProvider(app);
  });
}
