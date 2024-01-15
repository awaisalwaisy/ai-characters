<script setup lang="ts">
defineProps<{ variant: "Mobile" | "Desktop" }>();
</script>

<template>
  <!-- <Component :is="sidebarVariants[props.variant]" /> -->

  <template v-if="variant === 'Desktop'">
    <SidebarMenu :is-pro="false" />
  </template>
  <template v-else-if="variant === 'Mobile'">
    <SidebarMobile />
  </template>
</template>
