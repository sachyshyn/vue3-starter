<template>
  <select name="i18n-lang-changer" v-model="languageModel">
    <option v-for="locale of translationService.availableLocales" :key="locale" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { translationService } from '@/shared/lib';
import { useLanguage } from '../model';

const languageModel = useLanguage();
</script>
