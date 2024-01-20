<template>
  <div className="flex-1 overflow-y-auto pr-4">
    <ChatMessage role="system" />
    <ChatMessage role="user" />
  </div>
</template>

<script setup lang="ts">
import ChatMessage from "./ChatMessage.vue";
</script>

<style scoped></style>
