"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CircularLoader from "@/components/Loaders/CircularLoader";
import { useConversations } from "@/hooks";

export default function CPage() {
  const theme = useTheme();
  const params = useParams();
  const middleRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [message, setMessage] = useState("");
  const [isMultilineActive, setIsMultilineActive] = useState(false);
  const { conversations } = useConversations();
  const conversationId = params?.conversionId;

  const chatTitle = conversations.value.pages[0]?.find(
    (conv: any) => conv.chatId === conversationId
  )?.title;

  useEffect(() => {
    if (middleRef.current) {
      middleRef.current.scrollTop = middleRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    const container = middleRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShowScrollToBottom(!atBottom);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (middleRef.current) {
      middleRef.current.scrollTo({
        top: middleRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleClickTitle = () => {
    console.log("Title clicked");
  };

  const handleClickShare = () => {
    console.log("Share clicked");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newMessage = e.target.value;
    setMessage(newMessage);

    if (textRef.current) {
      requestAnimationFrame(() => {
        const textarea = textRef.current as HTMLTextAreaElement;
        if (!textarea) return;

        const isMultiline = textarea.scrollHeight > textarea.clientHeight;
        setIsMultilineActive(isMultiline);
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (message.trim()) {
      console.log("Message submitted:", message);
      setMessage("");
      setIsMultilineActive(false);
      // Add submit logic here
    } else {
      // If message is empty, set error
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularLoader size={15} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          position: "relative",
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          height: "50px",
          backdropFilter: "blur(10px)",
          backgroundColor: theme.palette.customBackground.paper,
          zIndex: 9,
        }}
      >
        <Button
          onClick={handleClickTitle}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "4px 10px",
            borderRadius: 2,
            cursor: "pointer",
            textTransform: "none",
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
          endIcon={
            <KeyboardArrowDownIcon
              sx={{ fontSize: 16, color: theme.palette.customText.secondary }}
            />
          }
        >
          <Typography
            variant="body2"
            noWrap
            sx={{
              fontWeight: 600,
              color: theme.palette.customText.secondary,
            }}
          >
            {chatTitle}
          </Typography>
        </Button>
        <Button
          onClick={handleClickShare}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "4px 10px",
            borderRadius: 2,
            cursor: "pointer",
            textTransform: "none",
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }}
          startIcon={
            <FileUploadIcon
              sx={{ fontSize: 16, color: theme.palette.customText.secondary }}
            />
          }
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: theme.palette.customText.secondary,
            }}
          >
            Share
          </Typography>
        </Button>
      </Box>

      {/* Middle Content */}
      <Box
        ref={middleRef}
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          flexGrow: 1,
          overflowY: "auto",
          pb: 20,
          pt: 2,
          backgroundColor: theme.palette.customBackground.default,
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            height: "250vh",
            maxWidth: "800px",
            minHeight: "100%",
            width: { xs: "100%", sm: "90%", md: "80%" },
          }}
        ></Box>
      </Box>

      {/* Bottom Bar */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50px",
          width: "100%",
          backdropFilter: "blur(10px)",
          backgroundColor: theme.palette.customBackground.default,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            mb: 2,
            px: 2,
            maxWidth: "800px",
            width: { xs: "100%", sm: "90%", md: "80%" },
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              width: "100%",
            }}
          >
            {showScrollToBottom && (
              <Box
                sx={{
                  position: "absolute",
                  top: -50,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 100,
                }}
              >
                <IconButton
                  onClick={scrollToBottom}
                  size="small"
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor:
                      theme.palette.customButton.background.secondary,
                    "&:hover": {
                      backgroundColor:
                        theme.palette.customButton.hoverBackground.secondary,
                    },
                  }}
                >
                  <ArrowDownwardIcon
                    fontSize="inherit"
                    sx={{
                      color: theme.palette.customButton.background.primary,
                    }}
                  />
                </IconButton>
              </Box>
            )}
            <TextField
              inputRef={(el) => (textRef.current = el)}
              fullWidth
              multiline
              minRows={1}
              maxRows={10}
              id="outlined-basic"
              variant="outlined"
              placeholder="Ask anything"
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      size="small"
                      sx={{
                        width: { xs: 26, sm: 30 },
                        height: { xs: 26, sm: 30 },
                        borderRadius: "50%",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.customButton.hoverBackground
                              .secondary,
                        },
                      }}
                    >
                      <AddIcon
                        fontSize="inherit"
                        sx={{
                          color: theme.palette.customButton.background.primary,
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={handleSubmit}
                      disableRipple={!message.trim()}
                      sx={{
                        width: { xs: 26, sm: 30 },
                        height: { xs: 26, sm: 30 },
                        borderRadius: "50%",
                        cursor: !message.trim() ? "text" : "pointer",
                        backgroundColor: !message.trim()
                          ? theme.palette.customButton.background.secondary
                          : theme.palette.customButton.background.primary,
                        "&:hover": {
                          backgroundColor: !message.trim()
                            ? theme.palette.customButton.background.secondary
                            : theme.palette.customButton.hoverBackground
                                .primary,
                        },
                      }}
                    >
                      <ArrowUpwardIcon
                        fontSize="inherit"
                        sx={{
                          color: !message.trim()
                            ? theme.palette.customButton.background.primary
                            : theme.palette.customButton.background.secondary,
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                position: "relative",
                flex: { xs: 1, sm: "none" },
                order: { xs: 1, sm: 2 },
                "& > :not(style)": {
                  width: "100%",
                  transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
                  color: theme.palette.text.primary,
                },
                "& .MuiOutlinedInput-root": {
                  alignItems: "flex-end",
                  borderRadius: 4,
                  px: "16px",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(208, 208, 208, 0.7)",
                  },
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.customBorder.surface,
                  transition: "border-color 0.3s ease",
                },
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: theme.palette.customBorder.surface,
                    borderWidth: "1px",
                    boxShadow: "0 0 0 1px rgba(40, 40, 40, 0.1)",
                  },
                "& .MuiOutlinedInput-input": {
                  mb: isMultilineActive ? 5 : 0,
                  fontSize: { xs: 12, sm: 14 },
                  padding: isMultilineActive
                    ? { xs: "8px 12px", sm: "10px 14px" }
                    : 0,
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    cursor: "default",
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
                },
                "& .MuiInputBase-inputMultiline": {
                  py: 1,
                },
                "& .MuiInputAdornment-root": {
                  alignSelf: "flex-end",
                  paddingBottom: "6px",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
