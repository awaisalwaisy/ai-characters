import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "../ui/toast";
import { ADD_CHARACTER_SCHEMA } from "./../../utils/constants";

export const fnAddCharacter = () => {
  const loading = ref<boolean>(false);

  const formSchema = toTypedSchema(ADD_CHARACTER_SCHEMA);

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
