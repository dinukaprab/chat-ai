import { useEffect, useState } from "react";
import { getConversations } from "@/api/conversations";
import { useConversations } from "@/hooks";
import { ChatItem } from "@/utils";

export function useBootstrapConversations() {
  const { conversations, setConversations } = useConversations();
  const [flatChats, setFlatChats] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const existingPages = conversations?.value?.pages || [];
      const hasChats = existingPages.some(
        (page: ChatItem[]) => page.length > 0
      );

      if (!hasChats) {
        try {
          const chats: ChatItem[] = await getConversations();

          setConversations((prev) => ({
            ...prev,
            timestamp: Date.now(),
            value: { ...prev.value, pages: [chats], pageParams: [] },
            version: prev.version,
          }));

          setFlatChats(chats);
        } catch (err) {
          console.error("Failed to bootstrap conversations:", err);
        }
      } else {
        const allChats: ChatItem[] = existingPages.flat();
        setFlatChats(allChats);
      }

      setLoading(false);
    };

    fetchData();
  }, [conversations, setConversations]);

  return { flatChats, loading };
}
