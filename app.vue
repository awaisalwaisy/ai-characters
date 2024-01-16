<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <ProModel />
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: "AI Characters",
  meta: [{ name: "description", content: "Your customized AI  characters" }],
});
</script>
