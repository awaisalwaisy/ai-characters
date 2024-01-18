<script setup lang="ts">
import { $fnCloudinary } from "~/functions";

const inputRef = ref();
const { uploadFile, loading, uploadSuccess } = $fnCloudinary();
const { user } = useAuth();
const imgUrl = ref<string | null>(null);

// props
defineProps<{
  value?: string;
}>();

// emits
const emit = defineEmits<{
  (e: "upload", value?: string): void;
}>();

// methods
function openFilePicker() {
  inputRef.value.click();
}

async function onChange() {
  const res = await uploadFile(
    inputRef.value.files[0],
    user?.id + "/characters"
  );

  if (uploadSuccess.value) {
    imgUrl.value = res?.secure_url!;
  }

  // console.log(imgUrl.value, "imgUrl");

  emit("upload", res?.secure_url);
}
</script>

<template>
  <div class="space-y-4 w-full flex flex-col justify-center items-center">
    <input
      type="file"
      accept="image/*"
      ref="inputRef"
      hidden
      @change="onChange"
    />
    <div
      class="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center"
      @click="openFilePicker"
    >
      <!-- <div class="relative h-40 w-40">
    <Image fill alt="Upload" src={value || "/placeholder.svg"}
    class="rounded-lg object-cover" />
  </div> -->
      <img
        class="rounded-lg object-cover"
        :src="value ? value : '/placeholder.svg'"
        alt="Upload"
        width="160"
      />
    </div>
  </div>
</template>
