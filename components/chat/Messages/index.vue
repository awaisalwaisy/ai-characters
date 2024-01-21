<script setup lang="ts">
import type { Character } from "~/components/Characters/@types";
import type { MessageProps } from "./@types";
import ChatMessage from "./ChatMessage.vue";

// types
interface Props {
  messages: MessageProps[];
  isLoading?: boolean;
  character: Character | null;
}

// props
const props = defineProps<Props>();

// data
const fakeLoading = ref<boolean>(props.messages.length === 0 ? true : false);
const scrollRef = ref<HTMLDivElement | null>(null);

// computed
const content = computed(
  () => `Hello, I am ${props.character?.name}, ${props.character?.description}`
);

// lifecycle
onMounted(() => {
  const timeout = setTimeout(() => {
    fakeLoading.value = false;
  }, 1000);

  return () => {
    clearTimeout(timeout);
  };
});

// submit
</script>

<template>
  <div class="flex-1 overflow-y-auto pr-4">
    <ChatMessage
      :loading="fakeLoading"
      role="system"
      :content="content"
      :src="character?.src"
    />
    <ChatMessage
      v-for="message in messages"
      :key="message.content"
      :src="message.src"
      :role="message.role"
      :content="message.content"
    />

    <ChatMessage
      v-if="isLoading"
      role="system"
      isLoading
      :src="character?.src"
    />
    <div ref="{scrollRef}" />
  </div>
</template>
