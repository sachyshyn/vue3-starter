import { createPinia } from 'pinia';
import type { App } from 'vue';

export function createStoreProvider(app: App<Element>) {
  const store = createPinia();

  app.use(store);

  return app;
}
