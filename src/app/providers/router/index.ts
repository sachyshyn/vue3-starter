import type { Application } from '@/shared/lib';
import { createRouter, createWebHistory } from 'vue-router/auto';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:generated-layouts';

export function withRouterProvider(app: Application) {
  const router = createRouter({
    history: createWebHistory(),
    routes: setupLayouts(routes)
  });

  if (import.meta.hot) {
    handleHotUpdate(router);
  }

  app.use(router);
}
