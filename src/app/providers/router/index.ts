import type { Application } from '@/shared/lib';
import { createRouter, createWebHistory } from 'vue-router';
import { createRoutes } from './routes';

export function withRouterProvider(app: Application) {
  const router = createRouter({
    history: createWebHistory(),
    routes: createRoutes()
  });

  app.use(router);
}
