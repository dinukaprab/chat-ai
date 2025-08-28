import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export interface ChatItem {
  chatId: string;
  title: string;
  lastUpdated: string;
}

export function groupChatsByDate(chats: ChatItem[]) {
  const today = dayjs().startOf("day");
  const yesterday = today.subtract(1, "day");
  const sevenDaysAgo = today.subtract(7, "day");

  const grouped = {
    today: [] as ChatItem[],
    yesterday: [] as ChatItem[],
    previous7days: [] as ChatItem[],
    older: [] as ChatItem[],
  };

  chats.forEach((chat) => {
    const chatDate = dayjs(chat.lastUpdated);

    if (chatDate.isSame(today, "day")) {
      grouped.today.push(chat);
    } else if (chatDate.isSame(yesterday, "day")) {
      grouped.yesterday.push(chat);
    } else if (
      chatDate.isSameOrAfter(sevenDaysAgo, "day") &&
      chatDate.isBefore(yesterday, "day")
    ) {
      grouped.previous7days.push(chat);
    } else {
      grouped.older.push(chat);
    }
  });

  return grouped;
}
