<script setup lang="ts">
import { Copy } from "lucide-vue-next";
import { toast } from "~/components/ui/toast";
import type { MessageProps } from "./@types";

// props
const props = defineProps<MessageProps>();

// computed
const classes = computed(() => {
  return cn(
    "group flex items-start gap-x-3 py-4 w-full",
    props.role === "user" ? "justify-end" : "jus-start"
  );
});

// methods
function onCopy() {
  if (!props.content) {
    return;
  }

  navigator.clipboard.writeText(props.content);
  toast({
    description: "Message copied to clipboard.",
    duration: 3000,
  });
}
</script>

<template>
  <div :class="classes">
    <ChatAvatar v-if="role !== 'user' && src" :src="src" />

    <div class="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
      <img
        v-if="loading"
        src="/three-dots.svg"
        alt="beat loader"
        class="w-4 h-4"
      />
      <div v-else>
        {{ content }}
      </div>
    </div>

    <Avatar v-if="role === 'user'">
      <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
      <AvatarFallback>user</AvatarFallback>
    </Avatar>

    <div v-if="role !== 'user' && !loading">
      <Button
        @click="onCopy"
        class="opacity-0 group-hover:opacity-100 transition"
        size="icon"
        variant="ghost"
      >
        <Copy class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
