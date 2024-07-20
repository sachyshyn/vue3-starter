import '@/shared/assets/styles/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import { applyProviders } from './providers';
import { translationService } from '@/shared/lib';
import { APP_DEFAULT_LOCALE } from '@/shared/config';

export async function initApp() {
  const app = createApp(App);

  applyProviders(app);

  await translationService.loadTranslationMessages(APP_DEFAULT_LOCALE);

  app.mount('#app');
}
