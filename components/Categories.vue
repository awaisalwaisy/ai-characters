<script setup lang="ts">
import type { Category } from "@prisma/client";
import qs from "query-string";
import type { RouteQuery } from "~/@types/application";

// router
const router = useRouter();
const route = useRoute();
const categoryId = ref<RouteQuery>(route.query.categoryId);

// props
defineProps<{ categories: Category[] | null; loading: boolean }>();

// methods
function changeCategory(id?: string) {
  const query = { categoryId: id };

  router.push(qs.stringifyUrl({ url: "/", query }));
  categoryId.value = id!;
}

// computed
const classes = computed(
  () => `flex 
         items-center 
         text-center 
         text-xs 
         md:text-sm 
         px-2 
         md:px-4 
         py-2 
         md:py-3 
         rounded-md 
         bg-primary/10 
         hover:opacity-75 
         transition`
);
</script>

<template>
  <div class="w-full overflow-x-auto space-x-2 flex p-1">
    <button
      @click="changeCategory()"
      :class="cn(classes, !categoryId ? 'bg-primary/25' : 'bg-primary/10')"
    >
      Newest
    </button>
    <template v-if="loading">
      <div>Loading...</div>
    </template>
    <template v-else>
      <button
        v-for="category in categories"
        :class="
          cn(
            classes,
            category.id === categoryId ? 'bg-primary/25' : 'bg-primary/10'
          )
        "
        :key="category.id"
        @click="changeCategory(category.id)"
      >
        {{ category.name }}
      </button>
    </template>
  </div>
</template>
