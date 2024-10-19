<template>
  <vue-particles :id="id" :options="options" />
</template>

<script setup lang="ts">
defineProps<{
  id: string;
  options: {};
}>();
</script>
