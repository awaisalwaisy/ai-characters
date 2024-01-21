import { Companion, Message } from "@prisma/client";

export interface Character extends Companion {
  messages: Message[];
  _count: {
    messages: number;
  };
}
