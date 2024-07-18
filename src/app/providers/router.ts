import Home from '@/pages/Home.vue';
import { ROUTES } from '@/shared/config/routes';
import type { Application } from '@/shared/lib';
import { createRouter, createWebHistory } from 'vue-router';

function createRoutes() {
  const routes = [
    {
      path: ROUTES.HOME,
      name: 'home',
      component: Home
    },
    {
      path: ROUTES.ABOUT,
      name: 'about',
      component: async () => await import('@/pages/About.vue')
    }
  ];

  return routes;
}

export function createRouterProvider(app: Application) {
  const router = createRouter({
    history: createWebHistory(),
    routes: createRoutes()
  });

  app.use(router);

  return app;
}
