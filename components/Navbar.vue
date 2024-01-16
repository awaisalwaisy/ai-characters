<script setup lang="ts">
defineProps<{ isPro: boolean | null }>();
</script>

<template>
  <div
    class="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary"
  >
    <div class="flex items-center">
      <Sidebar variant="Mobile" :is-pro="isPro" />

      <NuxtLink to="/">
        <h1
          :class="
            cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              'font goes here'
            )
          "
        >
          AI Characters
        </h1>
      </NuxtLink>
    </div>
    <div class="flex items-center gap-x-3">
      <!-- <Button size="sm" variant="premium">
        Upgrade
        <Sparkles class="h-4 w-4 fill-white text-white ml-2" />
      </Button> -->
      <SubButton :is-pro="isPro" />
      <!-- {!isPro && (
      )} -->
      <!-- <ModeToggle /> -->
      <!-- <UserButton afterSignOutUrl="/" /> -->
      <UserButton />
    </div>
  </div>
</template>

<style scoped></style>
