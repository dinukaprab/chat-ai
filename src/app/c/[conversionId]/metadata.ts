import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChatItem } from "@/utils";

const chats: ChatItem[] = [
  // 👉 Today
  { chatId: "1", title: "Chat 1", lastUpdated: "2025-08-29T08:30:00Z" },
  { chatId: "2", title: "Chat 2", lastUpdated: "2025-08-29T09:10:00Z" },
  { chatId: "3", title: "Chat 3", lastUpdated: "2025-08-29T10:45:00Z" },
  { chatId: "4", title: "Chat 4", lastUpdated: "2025-08-29T11:15:00Z" },
  { chatId: "5", title: "Chat 5", lastUpdated: "2025-08-29T12:05:00Z" },
  { chatId: "6", title: "Chat 6", lastUpdated: "2025-08-29T13:25:00Z" },
  { chatId: "7", title: "Chat 7", lastUpdated: "2025-08-29T14:45:00Z" },
  { chatId: "8", title: "Chat 8", lastUpdated: "2025-08-29T16:20:00Z" },

  // 👉 Yesterday
  { chatId: "9", title: "Chat 9", lastUpdated: "2025-08-28T09:10:00Z" },
  { chatId: "10", title: "Chat 10", lastUpdated: "2025-08-28T10:45:00Z" },
  { chatId: "11", title: "Chat 11", lastUpdated: "2025-08-28T12:30:00Z" },
  { chatId: "12", title: "Chat 12", lastUpdated: "2025-08-28T14:50:00Z" },
  { chatId: "13", title: "Chat 13", lastUpdated: "2025-08-28T17:15:00Z" },

  // 👉 Previous 7 Days
  { chatId: "14", title: "Chat 14", lastUpdated: "2025-08-27T09:00:00Z" },
  { chatId: "15", title: "Chat 15", lastUpdated: "2025-08-26T13:40:00Z" },
  { chatId: "16", title: "Chat 16", lastUpdated: "2025-08-25T16:20:00Z" },
  { chatId: "17", title: "Chat 17", lastUpdated: "2025-08-24T19:50:00Z" },
  { chatId: "18", title: "Chat 18", lastUpdated: "2025-08-23T08:15:00Z" },
  { chatId: "19", title: "Chat 19", lastUpdated: "2025-08-22T11:30:00Z" },
  { chatId: "20", title: "Chat 20", lastUpdated: "2025-08-21T15:10:00Z" },

  // 👉 Older
  { chatId: "21", title: "Chat 21", lastUpdated: "2025-08-15T10:00:00Z" },
  { chatId: "22", title: "Chat 22", lastUpdated: "2025-08-10T12:45:00Z" },
  { chatId: "23", title: "Chat 23", lastUpdated: "2025-08-05T09:20:00Z" },
  { chatId: "24", title: "Chat 24", lastUpdated: "2025-07-30T08:00:00Z" },
  { chatId: "25", title: "Chat 25", lastUpdated: "2025-07-20T14:35:00Z" },
  { chatId: "26", title: "Chat 26", lastUpdated: "2025-07-10T18:10:00Z" },
  { chatId: "27", title: "Chat 27", lastUpdated: "2025-06-25T21:05:00Z" },
  { chatId: "28", title: "Chat 28", lastUpdated: "2025-06-15T11:25:00Z" },
  { chatId: "29", title: "Chat 29", lastUpdated: "2025-06-01T09:00:00Z" },
  { chatId: "30", title: "Chat 30", lastUpdated: "2025-05-15T07:40:00Z" },
];

export async function generateMetadata(props: {
  params: Promise<{ conversionId: string }>;
}): Promise<Metadata> {
  const { conversionId } = await props.params;
  const chat = chats.find((c) => c.chatId === conversionId);
  
  if (!chat) return notFound();

  return {
    title: chat.title,
    description: `Chat with Chat AI - ${chat.title}`,
  };
}
