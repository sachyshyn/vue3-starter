<template>
  <header>
    <div class="container header__container">
      <p>
        <img src="@/shared/assets/images/img.png" height="20" width="20" loading="lazy" alt="App Logo" />
        <span>{{ t('common.app_template_message', { api_url: APP_API_URL }) }}</span>
      </p>

      <ul>
        <li v-for="route of routes" :key="route.path">
          <RouterLink :to="route.path">{{ route.title }}</RouterLink>
        </li>
      </ul>

      <ChangeLanguageSelect />
    </div>
  </header>
</template>

<script setup lang="ts">
import { APP_API_URL } from '@/shared/config';
import { RouterLink, type RouteMap } from 'vue-router';
import { ChangeLanguageSelect } from '@/features/change-language';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { t } = useI18n();

const routes = computed<Array<{ path: keyof RouteMap; title: string }>>(() => [
  { path: '/', title: t('pages.home.link') },
  { path: '/about', title: t('pages.about.link') }
]);
</script>

<style scoped>
ul {
  display: flex;
  list-style: none;
  gap: 0.5rem;
}

p {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
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
