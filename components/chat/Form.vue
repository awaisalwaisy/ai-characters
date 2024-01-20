<script setup lang="ts">
import { SendHorizonal } from "lucide-vue-next";

interface Props {
  input: string;
  //   handleInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  //   onSubmit: (e: FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
  loading: boolean;
}

defineProps<Props>();
const input = ref();
</script>

<template>
  <form class="border-t border-primary/10 py-4 flex items-center gap-x-2">
    <Input
      :disabled="loading"
      v-model="input"
      placeholder="Type a message"
      class="rounded-lg bg-primary/10"
    />
    <Button :disabled="loading" variant="ghost">
      <SendHorizonal class="w-6 h-6" />
    </Button>
  </form>
</template>
