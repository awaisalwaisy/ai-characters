<script setup lang="ts">
import { Menu } from "lucide-vue-next";
import SidebarMenu from "./Menu.vue";

defineProps<{ isPro: boolean | null }>();
</script>

<template>
  <Sheet>
    <SheetTrigger class="md:hidden pr-4">
      <Menu />
    </SheetTrigger>
    <SheetContent side="left" class="p-0 bg-secondary pt-10 w-32">
      <SidebarMenu :is-pro="isPro" />
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
