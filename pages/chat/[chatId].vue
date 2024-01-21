<script setup lang="ts">
import type { Character } from "~/components/Characters/@types";
import { fnChat } from "./fn-chat";

definePageMeta({
  layout: "chat",
});

// router
const { chatId } = useRoute().params;

// fetching
const { data: character } = await useLazyFetch<Character>(
  "/api/chat/" + chatId
);

// submit
const { onSubmit, input, isLoading, messages } = fnChat({
  character: character.value,
});
</script>
<template>
  <div className="flex flex-col h-full p-4 space-y-2">
    <ChatHeader :character="character" />
    <ChatMessages
      :character="character"
      :isLoading="isLoading"
      :messages="messages"
    />
    <ChatForm v-model="input" :loading="isLoading" @submit="onSubmit" />
  </div>
</template>
