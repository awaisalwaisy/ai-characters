<script setup lang="ts">
definePageMeta({
  layout: "main",
  // middleware: ["auth-logged-in"],
});

// handle auth
/* const router = useRouter();
const auth = useAuth();
if (!auth.loggedIn) {
  console.log(auth.loggedIn);
  router.push("/sign-in");
} else {
  console.log(auth.loggedIn, "user");
} */

// fetch categories
const { pending, data: categories } = useLazyFetch("/api/categories");
</script>

<template>
  <div className="h-full p-4 space-y-2">
    <CharSearch />
    <Categories :categories="categories" :loading="pending" />
    <!-- 
      <Companions data={data} /> -->
    <Characters :data="[]" />
  </div>
</template>
