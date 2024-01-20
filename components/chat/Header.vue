<script setup lang="ts">
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-vue-next";

const router = useRouter();
const { user } = useAuth();
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
      <div class="flex flex-col gap-y-1">
        <div class="flex items-center gap-x-2">
          <p class="font-bold">Developer</p>
          <div class="flex items-center text-xs text-muted-foreground">
            <MessagesSquare class="w-3 h-3 mr-1" />
            <!-- {companion._count.messages} -->
            5
          </div>
        </div>
        <p class="text-xs text-muted-foreground">Created by @awais</p>
      </div>
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
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
