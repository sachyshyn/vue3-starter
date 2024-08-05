import type { Application } from '@/shared/lib';
import { createRouter, createWebHistory } from 'vue-router';

import { routes, handleHotUpdate } from 'vue-router/auto-routes';

export function withRouterProvider(app: Application) {
  const router = createRouter({
    history: createWebHistory(),
    routes
  });

  if (import.meta.hot) {
    handleHotUpdate(router);
  }

  app.use(router);
}
