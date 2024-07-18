<template>
  <header>
    <div class="container header__container">
      <p>{{ t('common.app_template_message', { api_url: APP_API_URL }) }}</p>
      <ul>
        <li v-for="route of routes" :key="route.path">
          <RouterLink :to="route.path">{{ route.title }}</RouterLink>
        </li>
      </ul>

      <select v-model="locale" name="i18n-lang-changer">
        <option value="en">en</option>
        <option value="ru">ru</option>
      </select>
    </div>
  </header>

  <RouterView />
</template>

<script setup lang="ts">
import { APP_API_URL, ROUTES } from '@/shared/config';
import { useI18n } from 'vue-i18n';
import { RouterLink, RouterView } from 'vue-router';

const routes = [
  { path: ROUTES.HOME, title: 'home' },
  { path: ROUTES.ABOUT, title: 'about' }
];

const { t, locale } = useI18n();
</script>

<style scoped>
ul {
  display: flex;
  list-style: none;
  gap: 0.5rem;
}

.container {
  width: 1600px;
  max-width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-left: auto;
  margin-right: auto;
}

.header__container {
  display: flex;
  gap: 4rem;
  padding: 1rem;
  background-color: #f1f1f1;
}

a {
  text-decoration: none;
  transition: 0.4s;
  padding: 3px;
}

.router-link-exact-active {
  color: hsla(160deg, 100%, 37%, 1);
}
</style>
