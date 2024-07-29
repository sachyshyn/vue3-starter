import { HomePage } from '@/pages/Home';
import { ROUTES } from '@/shared/config';

export function createRoutes() {
  const routes = [
    {
      path: ROUTES.HOME,
      name: 'home',
      component: HomePage
    },

    {
      path: ROUTES.ABOUT,
      name: 'about',
      component: async () => await import('@/pages/About').then((m) => m.AboutPage)
    }
  ];

  return routes;
}
