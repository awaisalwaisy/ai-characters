<script setup lang="ts">
import type { Companion } from "@prisma/client";
import { MessagesSquare } from "lucide-vue-next";

interface Props {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
}
const props = defineProps<Props>();
</script>

<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 pb-10"
    v-if="props.data.length > 0"
  >
    <!-- {data.map((item) => ( -->
    <Card
      v-for="item in props.data"
      key="{item.name}"
      class="bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0"
    >
      <NuxtLink :to="`/chat/${item.id}`">
        <CardHeader
          class="flex items-center justify-center text-center text-muted-foreground"
        >
          <div class="relative w-32 h-32">
            <img
              :src="item.src"
              class="rounded-xl object-cover"
              alt="Character"
            />
          </div>
          <p class="font-bold">
            {{ item.name }}
          </p>
          <p class="text-xs">
            {{ item.description }}
          </p>
        </CardHeader>
        <CardFooter
          class="flex items-center justify-between text-xs text-muted-foreground"
        >
          <p class="lowercase">@{item.userName}</p>
          <div class="flex items-center">
            <MessagesSquare class="w-3 h-3 mr-1" />
            {{ item._count.messages }}
          </div>
        </CardFooter>
      </NuxtLink>
    </Card>
  </div>
  <CharactersEmpty v-else />
</template>
