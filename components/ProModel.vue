<script setup lang="ts">
import { $fnSubscribe } from "~/functions";

const { loading, onSubscribe } = $fnSubscribe();
const proModal = withAppStore();

// methods
function closeModal() {
  proModal.proModelStatus = false;
}
</script>

<template>
  <Dialog :open="proModal.proModelStatus" @update:open="closeModal">
    <DialogContent>
      <DialogHeader class="space-y-4">
        <DialogTitle class="text-center"> Upgrade to Pro </DialogTitle>
        <DialogDescription class="text-center space-y-2">
          Create
          <span class="text-sky-500 mx-1 font-medium">Custom AI</span>
          Characters!
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <div class="flex justify-between">
        <p class="text-2xl font-medium">
          $9<span class="text-sm font-normal">.99 / mo</span>
        </p>
        <Button @click="onSubscribe" :disabled="loading" variant="premium">
          Subscribe
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
