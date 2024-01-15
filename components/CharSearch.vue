<script setup lang="ts">
import { Search } from "lucide-vue-next";

const search = ref("");
const onChange = (val: string | number) => {
  console.log(val, "changed");
};
</script>

<template>
  <div class="relative">
    <Search class="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
    <Input
      @update:modelValue="(val) => onChange(val)"
      :model-value="search"
      placeholder="Search... Olivia.."
      class="pl-10 bg-primary/10"
    />
  </div>
</template>

<style scoped></style>
