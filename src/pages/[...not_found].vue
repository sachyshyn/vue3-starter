<template>
  <div id="not-found">
    <h1>{{ t('pages.not_found.title') }}</h1>
    <p>
      {{ t('pages.not_found.description') }}
    </p>
    <RouterLink to="/">{{ t('pages.not_found.actions_back') }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';

const { t } = useI18n();
</script>

<style scoped>
#not-found {
  text-align: center;
}

h1 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

p {
  margin-bottom: 0.5rem;
}
</style>
