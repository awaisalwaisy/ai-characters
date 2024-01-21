<script setup lang="ts">
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-vue-next";
import type { Character } from "../Characters/@types";

const router = useRouter();
const { user } = useAuth();

// types
interface Props {
  character: Character | null;
}

// props
defineProps<Props>();

// methods
</script>

<template>
  <div
    class="flex w-full justify-between items-center border-b border-primary/10 pb-4"
  >
    <div class="flex gap-x-2 items-center">
      <Button @click="router.back()" size="icon" variant="ghost">
        <ChevronLeft class="h-8 w-8" />
      </Button>
      <!-- <BotAvatar src="{companion.src}" /> -->
      <ChatAvatar :src="character?.src!" />
      <div class="flex flex-col gap-y-1">
        <div class="flex items-center gap-x-2">
          <p class="font-bold">{{ character?.name }}</p>
          <div class="flex items-center text-xs text-muted-foreground">
            <MessagesSquare class="w-3 h-3 mr-1" />
            {{ character?._count.messages }}
          </div>
        </div>
        <p class="text-xs text-muted-foreground">
          Created by {{ character?.userName }}
        </p>
      </div>
    </div>

    <DropdownMenu v-if="user?.id === character?.userId">
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem @click="routeTo(`/characters/${character?.id}`)">
          <Edit class="w-4 h-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Trash class="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
