import { createRouterProvider } from './router';
import { createStoreProvider } from './store';
import { createTranslationProvider } from './translation';
import type { Application } from '@/shared/lib';

export function applyProviders(app: Application) {
  const providers = [createStoreProvider, createRouterProvider, createTranslationProvider];

  providers.forEach((attachProvider) => {
    attachProvider(app);
  });
}
