<script setup lang="ts">
definePageMeta({
  layout: "main",
});

// fetch categories
const { pending, data: categories } = await useLazyFetch("/api/categories");
</script>

<template>
  <div className="h-full p-4 space-y-2">
    <CharSearch />
    <Categories :categories="categories" :loading="pending" />
    <!-- 
      <Companions data={data} /> -->
    <Characters :data="[]" />
  </div>
</template>
