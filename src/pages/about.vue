<template>
  <h1>{{ t('pages.about.title') }}</h1>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { definePage } from 'vue-router/auto';

const { t } = useI18n();

definePage({
  meta: {
    layout: false
  }
});
</script>
