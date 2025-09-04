import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChatItem } from "@/utils";
import { getConversations } from "@/api/conversations";

export async function generateMetadata(props: {
  params: Promise<{ conversionId: string }>;
}): Promise<Metadata> {
  const { conversionId } = await props.params;
  const chats: ChatItem[] = await getConversations();
  const chat = chats.find((c) => c.chatId === conversionId);

  if (!chat) return notFound();

  return {
    title: chat.title,
    description: `Chat with Chat AI - ${chat.title}`,
  };
}
