<script setup lang="ts">
definePageMeta({
  layout: "main",
});

// router
const characterId = useRoute().params.param;

// data fetching
const { data: isPro } = await useFetch("/api/ispro");
if (!isPro.value) {
  navigateTo("/");
}

const { data: initialData, error } = await useLazyFetch(
  `/api/character/${characterId}`
);
const { data: categories } = await useLazyFetch("/api/categories");
</script>

<template>
  <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
    <AddCharacter :categories="categories" :initialData="initialData" />
  </div>
</template>
