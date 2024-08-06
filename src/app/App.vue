<template>
  <HeaderWidget />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { HeaderWidget } from '@/widgets/header';
</script>
