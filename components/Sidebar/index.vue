<script setup lang="ts">
defineProps<{ variant: "Mobile" | "Desktop"; isPro: boolean | null }>();
</script>

<template>
  <!-- <Component :is="sidebarVariants[props.variant]" /> -->

  <template v-if="variant === 'Desktop'">
    <SidebarMenu :is-pro="isPro" />
  </template>
  <template v-else-if="variant === 'Mobile'">
    <SidebarMobile :is-pro="isPro" />
  </template>
</template>
