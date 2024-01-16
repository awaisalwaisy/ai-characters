<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const { data: categories } = await useFetch("/api/categories");
</script>

<template>
  <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
    <AddCharacter :categories="categories" />
  </div>
</template>
