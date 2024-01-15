<script setup lang="ts">
const { data: isPro } = useLazyFetch("/api/ispro");
</script>

<template>
  <div class="h-full" id="main">
    <!-- <Navbar isPro={isPro} /> -->
    <Navbar :is-pro="isPro" />
    <aside class="hidden md:flex mt-16 h-full w-20 flex-col fixed inset-y-0">
      <Sidebar variant="Desktop" />
    </aside>
    <main class="md:pl-20 pt-16 h-full">
      <slot />
    </main>
  </div>
</template>
