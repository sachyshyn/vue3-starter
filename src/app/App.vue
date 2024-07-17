<script setup lang="ts">
import { APP_API_URL, ROUTES } from '@/shared/config';
import { RouterLink } from 'vue-router';
</script>

<template>
  <h1>{{ APP_API_URL }}</h1>
  <ul>
    <li>
      <RouterLink :to="ROUTES.HOME">Home</RouterLink>
    </li>
    <li>
      <RouterLink :to="ROUTES.ABOUT">About</RouterLink>
    </li>
  </ul>
</template>
