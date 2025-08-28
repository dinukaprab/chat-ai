import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  Typography,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  useTheme,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MENU_CONFIG } from "@/config";
import { groupChatsByDate, ChatItem } from "@/utils";

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

interface SidebarProps {
  height: number;
  width: number;
  isSidebarOpen: boolean;
  handleClickSearchChats?: () => void;
}

export default function Sidebar({
  height,
  width,
  isSidebarOpen,
  handleClickSearchChats = () => {},
}: SidebarProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const currentChatId = pathname.split("/c/")[1];
  const groupedChats = groupChatsByDate(chats);

  const handleClickListItem = (id: string) => {
    if (id === "sidebar-new-chat") {
      router.push("/");
    } else if (id === "sidebar-search-chats") {
      handleClickSearchChats();
    } else if (id === "sidebar-library") {
      router.push("/library");
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          top: 0,
          left: 0,
          mt: `${height}px`,
          height: `calc(100% - ${height}px)`,
          width: isSidebarOpen ? `${width - 10}px` : "auto",
          backgroundColor: theme.palette.customBackground.main,
        }}
      >
        {/* Fixed Menu Section */}
        <Box sx={{ flexShrink: 0, mt: 2, mb: 1, px: 1 }}>
          <MenuList dense>
            {MENU_CONFIG.map((item) => (
              <MenuItem
                onClick={() => handleClickListItem(item.id)}
                key={item.id}
                sx={{
                  mb: 0.2,
                  px: 0.5,
                  py: 1,
                  borderRadius: 1.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: 0,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {isSidebarOpen && (
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: 12, sm: 14 },
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: 500,
                          userSelect: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                )}
              </MenuItem>
            ))}
          </MenuList>
        </Box>

        {isSidebarOpen && (
          <>
            <Divider
              variant="middle"
              sx={{ mb: 2, borderColor: theme.palette.customDivider.primary }}
            />

            {/* Chats Section */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                pb: 10,
                mb: 2,
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.divider,
                  borderRadius: "3px",
                  "&:hover": {
                    backgroundColor: theme.palette.text.disabled,
                  },
                },
              }}
            >
              {Object.entries(groupedChats).map(([section, items]) =>
                items.length > 0 ? (
                  <React.Fragment key={section}>
                    <Box sx={{ mt: 1 }}>
                      <ListSubheader
                        sx={{
                          ml: -1,
                          background: "transparent",
                          userSelect: "none",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: { xs: 10, sm: 12 },
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {section === "today"
                            ? "Today"
                            : section === "yesterday"
                            ? "Yesterday"
                            : section === "previous7days"
                            ? "Previous 7 Days"
                            : "Older"}
                        </Typography>
                      </ListSubheader>
                    </Box>

                    <Box sx={{ px: 1 }}>
                      <MenuList dense>
                        {items.map((chat) => (
                          <MenuItem
                            key={chat.chatId}
                            onClick={() => router.push(`/c/${chat.chatId}`)}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 0.2,
                              px: 1,
                              borderRadius: 1.5,
                              backgroundColor:
                                currentChatId === chat.chatId
                                  ? theme.palette.action.selected
                                  : "transparent",
                              "&:hover:not(:has(.chat-menu:hover))": {
                                backgroundColor:
                                  currentChatId === chat.chatId
                                    ? theme.palette.action.selected
                                    : theme.palette.action.hover,
                              },
                              "&:hover .chat-menu": {
                                opacity: 1,
                              },
                              "&:hover .chat-menu:hover": {
                                backgroundColor: "transparent",
                              },
                            }}
                          >
                            <ListItemText
                              primary={
                                <Typography
                                  variant="inherit"
                                  noWrap
                                  sx={{
                                    color: theme.palette.customText.secondary,
                                    fontSize: { xs: 12, sm: 14 },
                                    fontWeight: 500,
                                  }}
                                >
                                  {chat.title}
                                </Typography>
                              }
                            />
                            <Box
                              className="chat-menu"
                              onClick={(e) => {
                                e.stopPropagation();
                                // handle menu action
                                console.log(
                                  "Menu clicked for chat:",
                                  chat.chatId
                                );
                              }}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                opacity: 0,
                                transition: "opacity 0.2s",
                                ml: 1,
                                borderRadius: 0,
                                flexShrink: 0,
                                zIndex: 10,
                                position: "relative",
                              }}
                            >
                              <MoreHorizIcon
                                sx={{
                                  display: "block",
                                  margin: "auto",
                                  fontSize: 18,
                                }}
                              />
                            </Box>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Box>
                  </React.Fragment>
                ) : null
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
