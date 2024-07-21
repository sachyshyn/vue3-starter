<template>
  <p>{{ props.text }}</p>
</template>
]

<script setup lang="ts">
const props = defineProps<{ text: string }>();
</script>
