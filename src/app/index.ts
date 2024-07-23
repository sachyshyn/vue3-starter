import '@/shared/assets/styles/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { applyProviders } from './providers';
import { translationService } from '@/shared/lib';

export async function initApp() {
  const app = createApp(App);

  applyProviders(app);

  await translationService.loadTranslationMessages(translationService.defaultLocale);

  app.mount('#app');
}
