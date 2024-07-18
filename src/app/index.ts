import '@/shared/assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { applyProviders } from './providers';

export async function initApp() {
  const app = createApp(App);

  applyProviders(app);

  app.mount('#app');
}
