<template>
  <label for="i18n-lang-changer">
    <span>{{ $t('common.current_language') }}</span>

    <select
      :aria-label="$t('common.change_language')"
      name="i18n-lang-changer"
      id="i18n-lang-changer"
      v-model="changeLanguageModel"
    >
      <option v-for="locale of translationService.availableLocales" :key="locale" :value="locale">
        {{ locale }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
import { translationService } from '@/shared/lib';
import { useChangeLanguageModel } from '../model';

const changeLanguageModel = useChangeLanguageModel();
</script>

<style scoped>
#i18n-lang-changer {
  margin-left: 0.825rem;
}
</style>
