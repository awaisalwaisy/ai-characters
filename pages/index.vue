<script setup lang="ts">
import type { Companion } from "@prisma/client";

definePageMeta({
  layout: "main",
});

// router
const { categoryId } = useRoute().query;
const URL = categoryId?.toString()
  ? `/api/characters?categoryId=${categoryId}`
  : "/api/characters";

// fetch categories
const { pending, data: categories } = await useLazyFetch("/api/categories");
const { data: characters, pending: loading } = await useLazyFetch<
  (Companion & {
    _count: {
      messages: number;
    };
  })[]
>(URL);
</script>

<template>
  <div className="h-full p-4 space-y-2">
    <CharSearch />
    <Categories :categories="categories" :loading="pending" />
    <!-- 
      <Companions data={data} /> -->
    <Characters :characters="characters!" :loading="loading" />
  </div>
</template>
