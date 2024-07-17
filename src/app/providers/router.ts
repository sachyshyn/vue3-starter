import Home from '@/pages/Home.vue';
import { ROUTES } from '@/shared/config/routes';
import type { App } from 'vue';
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

export function createRouterProvider(app: App<Element>) {
  const router = createRouter({
    history: createWebHistory(),
    routes: createRoutes()
  });

  app.use(router);

  return app;
}
