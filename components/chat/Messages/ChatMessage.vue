<script setup lang="ts">
import { Copy } from "lucide-vue-next";
import { toast } from "~/components/ui/toast";

// types
export interface Props {
  role: "system" | "user";
  content?: string;
  loading?: boolean;
  src?: string;
}

// props
const props = defineProps<Props>();

// computed
const classes = computed(() => {
  return cn(
    "group flex items-start gap-x-3 py-4 w-full",
    props.role === "user" ? "items-end" : "items-start"
  );
});

// methods
function onCopy(content: string) {
  if (!content) {
    return;
  }

  navigator.clipboard.writeText(content);
  toast({
    description: "Message copied to clipboard.",
    duration: 3000,
  });
}
</script>

<template>
  <div :class="classes">
    <div v-if="role !== 'user' && !src">
      <!-- BotAvatar -->
      BotAvatar goes here
    </div>
    <div class="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
      <div v-if="loading">BeatLoader</div>
      <div else>
        <!-- {{ content }} -->
        Hello, I am Olivia Park, Mech Cadet
      </div>
    </div>
    <div v-if="role === 'user'">UserAvatar</div>
    <div v-if="role === 'user' && !loading">
      <div v-if="role === 'user' && !loading">
        <Button
          @click="onCopy(`Hello, I am Olivia Park, Mech Cadet`)"
          class="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost"
        >
          <Copy class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
