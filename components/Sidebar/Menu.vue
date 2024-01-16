<script setup lang="ts">
const router = useRouter();
const route = useRoute();
import { Home, Plus, Settings } from "lucide-vue-next";

const props = defineProps<{ isPro: boolean | null }>();
const proModal = withAppStore();

const onNavigate = (url: string, pro: boolean) => {
  if (pro && !props.isPro) {
    proModal.proModelStatus = true;
    return proModal;
  }

  return router.push(url);
};

const routes = [
  {
    icon: Home,
    to: "/",
    label: "Home",
    pro: false,
  },
  {
    icon: Plus,
    to: "/characters/new",
    label: "Create",
    pro: true,
  },
  {
    icon: Settings,
    to: "/settings",
    label: "Settings",
    pro: false,
  },
];
</script>

<template>
  <div class="space-y-4 flex flex-col h-full text-primary bg-secondary">
    <div class="p-3 flex-1 flex justify-center">
      <div class="space-y-2">
        <div
          v-for="item in routes"
          :key="item.to"
          @click="onNavigate(item.to, item.pro)"
          :class="
            cn(
              'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
              route.path === item.to && 'bg-primary/10 text-primary'
            )
          "
        >
          <div class="flex flex-col gap-y-2 items-center flex-1">
            <Component :is="item.icon" class="h-5 w-5" />
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
