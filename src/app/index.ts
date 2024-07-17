import '@/shared/assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { applyProviders } from './providers';

export function initApp() {
  const app = createApp(App);
  applyProviders(app);

  return app;
}
