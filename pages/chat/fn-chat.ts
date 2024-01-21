import { useCompletion } from "ai/vue";
import type { MessageProps } from "~/components/chat/Messages/@types/index.d";
import type { FnChatParams } from "./@types/index.d";

export const fnChat = ({ character }: FnChatParams) => {
  const messages = ref<MessageProps[]>(character?.messages || []);
  const router = useRouter();

  const { input, isLoading, handleSubmit } = useCompletion({
    api: `/api/chat/${character?.id}`,
    onFinish(_prompt, completion) {
      const systemMessage: MessageProps = {
        role: "system",
        content: completion,
      };

      console.log("systemMessage", systemMessage);
      messages.value.push(systemMessage);

      input.value = "";

      router.push({
        query: {
          chatId: character?.id,
        },
      });
    },
  });

  const onSubmit = (e: Event) => {
    const userMessage: MessageProps = {
      role: "user",
      content: input.value,
    };

    messages.value.push(userMessage);

    handleSubmit(e);
  };

  return {
    input,
    isLoading,
    messages,
    onSubmit,
  };
};
