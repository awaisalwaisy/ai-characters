import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { toast } from "../ui/toast";

export const fnAddCharacter = () => {
  const loading = ref<boolean>(false);

  const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(1, {
        message: "Name is required.",
      }),
      description: z.string().min(1, {
        message: "Description is required.",
      }),
      instructions: z.string().min(200, {
        message: "Instructions require at least 200 characters.",
      }),
      seed: z.string().min(200, {
        message: "Seed requires at least 200 characters.",
      }),
      src: z.string().min(1, {
        message: "Image is required.",
      }),
      categoryId: z.string().min(1, {
        message: "Category is required",
      }),
    })
  );

  const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {},
  });

  const onSubmit = handleSubmit((values) => {
    console.log(values);
    toast({
      title: "You submitted the following values:",
      description: h(
        "pre",
        { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
        h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
      ),
    });
  });

  return {
    onSubmit,
    resetForm,
    loading,
  };
};
