<script setup lang="ts">
withDefaults(
  defineProps<{
    imageUrl?: string;
    name?: string;
  }>(),
  {
    imageUrl: "https://github.com/radix-vue.png",
    name: "User on Ai Character",
  }
);
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage :src="imageUrl" alt="@radix-vue" />
        <AvatarFallback>{{ name }}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel> -->
      <!-- <DropdownMenuSeparator /> -->
      <!-- <DropdownMenuItem>Profile</DropdownMenuItem> -->
      <!-- <DropdownMenuItem>Billing</DropdownMenuItem> -->
      <!-- <DropdownMenuItem>Team</DropdownMenuItem> -->
      <DropdownMenuItem>
        <NuxtLink to="/api/logout" external> Logout </NuxtLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
