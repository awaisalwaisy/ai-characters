import { toast } from "~/components/ui/toast";

export function $fnSubscribe() {
  const loading = ref(false);

  const onSubscribe = async () => {
    loading.value = true;

    const { pending, data, error } = await useLazyFetch<{ url: string }>(
      "/api/stripe"
    );

    loading.value = false;

    if (data.value?.url) {
      navigateTo(data.value?.url!, { external: true });
    }

    if (error.value) {
      loading.value = false;
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return { onSubscribe, loading };
}
