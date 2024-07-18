<script setup lang="ts">
import { APP_API_URL, ROUTES } from '@/shared/config';
import { RouterLink, RouterView } from 'vue-router';

const routes = [
  { path: ROUTES.HOME, title: 'Home' },
  { path: ROUTES.ABOUT, title: 'About' }
];
</script>

<template>
  <header>
    <div class="container header__container">
      <p>App Template with api url {{ APP_API_URL }}</p>
      <ul>
        <li v-for="route of routes" :key="route.path">
          <RouterLink :to="route.path">{{ route.title }}</RouterLink>
        </li>
      </ul>
    </div>
  </header>
  <div class="container"></div>

  <RouterView />
</template>

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
