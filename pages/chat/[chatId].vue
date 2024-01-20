<script setup lang="ts">
import type { Companion } from "@prisma/client";
import type { MessageProps } from "~/components/chat/Messages/@types";

definePageMeta({
  layout: "chat",
});

// variables
const loading = ref(false);
const input = ref();

// types
interface Props {
  messages: MessageProps[];
  isLoading: boolean;
  character: Companion;
}

// props
defineProps<Props>();
</script>
<template>
  <div className="flex flex-col h-full p-4 space-y-2">
    <ChatHeader />
    <ChatMessages />
    <ChatForm :input="input" :loading="loading" />
  </div>
</template>
