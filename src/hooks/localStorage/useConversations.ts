import { useEffect, useMemo, useCallback, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface ConversationCache {
  timestamp: number;
  value: {
    pageParams: any[];
    pages: any[];
  };
  version: number;
}

export const defaultConversationCache: ConversationCache = {
  timestamp: 0,
  value: {
    pageParams: [],
    pages: [],
  },
  version: 1,
};

export function useConversations() {
  const userId = "user-KKmaW89a9xEdZdFhbpaQ0RYn";
  const storageKey = `cache/${userId}/conversation-history`;

  const [isLoaded, setIsLoaded] = useState(false);

  const [conversationHistory, setConversationHistory] =
    useLocalStorage<ConversationCache>(storageKey, defaultConversationCache);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoaded(true);
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored) as ConversationCache;
          if (JSON.stringify(parsed) !== JSON.stringify(conversationHistory)) {
            setConversationHistory(parsed);
          }
        }
      } catch (error) {
        console.error("Conversation sync error:", error);
      }
    }
  }, [storageKey]);

  const memoizedConversations = useMemo(
    () => conversationHistory,
    [conversationHistory]
  );

  const updateConversations = useCallback(
    (
      newData:
        | ConversationCache
        | ((prev: ConversationCache) => ConversationCache)
    ) => {
      setConversationHistory((prev) => {
        const updated = typeof newData === "function" ? newData(prev) : newData;

        const validated: ConversationCache = {
          timestamp: updated.timestamp || Date.now(),
          value: {
            pageParams: updated.value?.pageParams || [],
            pages: updated.value?.pages || [],
          },
          version: updated.version || defaultConversationCache.version,
        };

        return validated;
      });
    },
    [setConversationHistory]
  );

  return {
    conversations: memoizedConversations,
    setConversations: updateConversations,
    isLoaded,
  };
}
