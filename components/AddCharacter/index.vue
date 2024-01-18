<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import type { Category } from "@prisma/client";
import { Wand2 } from "lucide-vue-next";
import ImageUpload from "./ImageUpload.vue";
import { fnAddCharacter } from "./fn-add-char";

// props
defineProps<{ categories: Category[] | null }>();

// methods
const { onSubmit, loading } = fnAddCharacter();
function onImageUpload(val?: string) {
  console.log("onImageUpload", val);
}
</script>

<template>
  <form @submit="onSubmit" class="space-y-8 pb-10">
    <div class="space-y-2 w-full col-span-2">
      <div>
        <h3 class="text-lg font-medium">General Information</h3>
        <p class="text-sm text-muted-foreground">
          General information about your Companion
        </p>
      </div>
      <Separator class="bg-primary/10" />
    </div>
    <FormField v-slot="{ componentField, field, value }" name="src">
      <FormItem
        v-auto-animate
        class="flex flex-col items-center justify-center space-y-4 col-span-2"
      >
        <FormControl>
          <ImageUpload @upload="field.onChange" :value="value" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <!-- <div class="">
      Image upload goes here
      <ImageUpload @upload="(val) => onImageUpload(val)" />
    </div> -->

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem v-auto-animate>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Awais alwaisy"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription>
            This is how your AI Companion will be named.
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="description">
        <FormItem v-auto-animate>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Frontend Developer"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription>
            Short description for your AI Companion
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="categoryId">
        <FormItem v-auto-animate>
          <FormLabel>Category</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription> Select a category for your AI </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="space-y-2 w-full">
      <div>
        <h3 class="text-lg font-medium">Configuration</h3>
        <p class="text-sm text-muted-foreground">
          Detailed instructions for AI Behaviour
        </p>
      </div>
      <Separator class="bg-primary/10" />
    </div>
    <FormField v-slot="{ componentField }" name="instructions">
      <FormItem v-auto-animate>
        <FormLabel>Instructions</FormLabel>
        <FormControl>
          <Textarea
            rows="7"
            placeholder="Tell us a little bit about yourself"
            class="bg-background resize-none"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          Describe in detail your companion&apos;s backstory and relevant
          details.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="seed">
      <FormItem v-auto-animate>
        <FormLabel>Example Conversation</FormLabel>
        <FormControl>
          <Textarea
            rows="7"
            placeholder="Tell us a little bit about yourself"
            class="bg-background resize-none"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          Write couple of examples of a human chatting with your AI companion,
          write expected answers.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="w-full flex justify-center">
      <Button size="lg" :disabled="loading" type="submit">
        <!-- {initialData ? "Edit your companion" : "Create your companion"} -->
        Create your character
        <Wand2 class="w-4 h-4 ml-2" />
      </Button>
    </div>
  </form>
</template>
