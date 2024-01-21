<script setup lang="ts">
import { SendHorizonal } from "lucide-vue-next";

// props
defineProps<{
  modelValue?: string | number;
  loading?: boolean;
  onSubmit?: (e: Event) => void;
}>();

// emits
const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
  (e: "submit", payload: Event): void;
}>();

// methods
function updateModelValue(value: string | number) {
  emits("update:modelValue", value);
}

function onSubmit(e: Event) {
  emits("submit", e);
}
</script>

<template>
  <form
    @submit="onSubmit"
    class="border-t border-primary/10 py-4 flex items-center gap-x-2"
  >
    <Input
      :disabled="loading"
      :model-value="modelValue"
      @update:modelValue="updateModelValue"
      placeholder="Type a message"
      class="rounded-lg bg-primary/10"
    />
    <Button :disabled="loading" variant="ghost">
      <SendHorizonal class="w-6 h-6" />
    </Button>
  </form>
</template>
