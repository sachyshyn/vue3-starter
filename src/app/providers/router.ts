import { HomePage } from '@/pages/Home';
import { ROUTES } from '@/shared/config';
import type { Application } from '@/shared/lib';
import { createRouter, createWebHistory } from 'vue-router';

function createRoutes() {
  const routes = [
    {
      path: ROUTES.HOME,
      name: 'home',
      component: HomePage
    },
    {
      path: ROUTES.ABOUT,
      name: 'about',
      component: async () => {
        const { AboutPage } = await import('@/pages/About');

        return AboutPage;
      }
    }
  ];

  return routes;
}

export function withRouterProvider(app: Application) {
  const router = createRouter({
    history: createWebHistory(),
    routes: createRoutes()
  });

  app.use(router);
}
