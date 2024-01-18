import type { CloudinaryResponse } from "~/@types/application";

export function $fnCloudinary() {
  const loading = ref(false);
  const config = useRuntimeConfig();
  const uploadSuccess = ref(false);

  const uploadFile = async (file: File, folderPath: string) => {
    loading.value = true;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", config.public.cldPreset);
    data.append("cloud_name", config.public.cloudName);
    data.append("folder", `ai-characters/${folderPath}`);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${config.public.cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = (await response.json()) as CloudinaryResponse;
      loading.value = false;

      if (res.secure_url) {
        uploadSuccess.value = true;
      }

      return res;
    } catch (error) {
      loading.value = false;
    }
  };

  return { uploadFile, loading, uploadSuccess };
}
