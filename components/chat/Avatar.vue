<script setup lang="ts">
defineProps<{ src: string }>();
</script>

<template>
  <Avatar class="h-12 w-12">
    <AvatarImage :src="src" />
  </Avatar>
</template>
