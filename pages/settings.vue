<script setup lang="ts">
definePageMeta({
  layout: "main",
});
const { data: isPro } = useLazyFetch("/api/ispro");

const proStatusText = computed(() =>
  isPro.value
    ? "You are currently on a Pro plan."
    : "You are currently on a free plan."
);
</script>

<template>
  <div class="h-full p-4 space-y-2">
    <h3 class="text-lg font-medium">Settings</h3>
    <div class="text-muted-foreground text-sm">
      {{ proStatusText }}
    </div>
    <!-- <SubscriptionButton isPro={isPro} /> -->
    <SubButton :is-pro="isPro" />
  </div>
</template>

<style scoped></style>
