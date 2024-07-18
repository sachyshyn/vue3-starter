import type { Application } from '@/shared/lib';
import { createPinia } from 'pinia';

export function createStoreProvider(app: Application) {
  const store = createPinia();

  app.use(store);
}
