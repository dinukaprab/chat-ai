import React, { useRef, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  Typography,
  MenuList,
  Skeleton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  useTheme,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MENU_CONFIG } from "@/config";
import { groupChatsByDate } from "@/utils";
import { useBootstrapConversations } from "@/hooks/bootstrap/useBootstrapConversations";

interface SidebarProps {
  height: number;
  width: number;
  isSidebarOpen: boolean;
  handleClickSearchChats?: () => void;
}

interface TruncatedTextProps {
  children: string;
  sx?: any;
}

function TruncatedText({ children, sx }: TruncatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [children]);

  return (
    <Typography
      ref={textRef}
      title={isTruncated ? children : ""}
      noWrap
      sx={{ overflow: "hidden", textOverflow: "ellipsis", ...sx }}
    >
      {children}
    </Typography>
  );
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
  const [chatHovered, setChatHovered] = useState<string | null>(null);
  const { flatChats, loading } = useBootstrapConversations();
  const groupedChats = groupChatsByDate(flatChats);

  const hasChats = Object.values(groupedChats).some(
    (section) => section.length > 0
  );

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

        {(isSidebarOpen && hasChats) || loading ? (
          <Divider
            variant="middle"
            sx={{
              mb: 2,
              borderColor: theme.palette.customDivider.primary,
            }}
          />
        ) : null}

        {loading && isSidebarOpen ? (
          <Box sx={{ px: 1 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={25}
                sx={{
                  mb: 0.5,
                  borderRadius: 1.5,
                }}
              />
            ))}
          </Box>
        ) : (
          isSidebarOpen && (
            <>
              {/* Chats Section */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  overflowX: "hidden",
                  pb: 20,
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
                              onMouseEnter={() => setChatHovered(chat.chatId)}
                              onMouseLeave={() => setChatHovered(null)}
                              onMouseDown={() => setChatHovered(chat.chatId)}
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
                                  <TruncatedText
                                    sx={{
                                      color: theme.palette.customText.secondary,
                                      fontSize: { xs: 12, sm: 14 },
                                      fontWeight: 500,
                                    }}
                                  >
                                    {chat.title}
                                  </TruncatedText>
                                }
                              />
                              {chatHovered === chat.chatId && (
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
                                      fontSize: 18,
                                    }}
                                  />
                                </Box>
                              )}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Box>
                    </React.Fragment>
                  ) : null
                )}
              </Box>
            </>
          )
        )}
      </Box>
    </>
  );
}
