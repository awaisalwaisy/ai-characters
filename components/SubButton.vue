<script setup lang="ts">
import { Sparkles } from "lucide-vue-next";

const props = defineProps<{ isPro: boolean | null }>();
const btnVariant = computed(() => (props.isPro ? "default" : "premium"));
const loading = ref<boolean>(false);
const proModal = withAppStore();

// methods
function toggleModal() {
  proModal.proModelStatus = true;
}

function initiateStripe() {
  console.log("initiateStripe");
}
</script>

<template>
  <Button
    size="sm"
    :variant="btnVariant"
    :disabled="loading"
    @click="toggleModal"
  >
    {{ isPro ? "Manage Subscription" : "Upgrade" }}
    <Sparkles v-if="!isPro" class="w-4 h-4 ml-2 fill-white" />
  </Button>
</template>
