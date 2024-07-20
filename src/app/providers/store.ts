import type { Application } from '@/shared/lib';
import { createPinia } from 'pinia';

export function withStoreProvider(app: Application) {
  const store = createPinia();

  app.use(store);
}
