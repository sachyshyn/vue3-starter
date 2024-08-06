<template>
  <HeaderWidget />
  <p style="margin: 2rem">[ DEFAULT LAYOUT ]</p>
  <RouterView />
</template>

<script setup lang="ts">
import { HeaderWidget } from '@/widgets/header';
import { RouterView } from 'vue-router/auto';
</script>
