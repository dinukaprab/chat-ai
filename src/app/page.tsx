"use client";
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Chip,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { predefinedPrompts } from "@/constants";
import CircularLoader from "@/components/Loaders/CircularLoader";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const randomTime = Math.floor(Math.random() * 1000) + 500;

    const timer = setTimeout(() => {
      setLoading(false);
    }, randomTime);

    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    if (!prompt) {
      setIsFocused(false);
    }
  };

  const handleUploadClick = () => {
    setIsFocused((prev) => prev);
  };

  const handleSubmit = (value: string) => {
    if (!value) {
      console.log("Input is empty, submission cancelled.");
      return;
    }

    setLoading(true);
    setPrompt("");
    setIsFocused(false);

    if (inputRef.current) {
      inputRef.current.blur();
    }

    const uniqueKey: string = uuidv4();

    setTimeout(() => {
      router.push(`/c/${uniqueKey}`);
    }, 50);
  };

  const handleAddprompt = (value: string) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPrompt(value);
  };

  const getInputWidth = () => {
    if (isMobile) return isFocused ? "55vw" : "45vw";
    if (isTablet) return isFocused ? "30em" : "22.5em";
    return isFocused ? "32em" : "22.5em";
  };

  const getIconSize = () => {
    if (isMobile) return { width: 45, height: 45 };
    return { width: 55, height: 55 };
  };

  const getTitleFontSize = () => {
    if (isMobile) return 18;
    if (isTablet) return 20;
    return 22;
  };

  const getButtonWidth = () => {
    if (isMobile) return isFocused ? "35px" : "90px";
    return isFocused ? "40px" : "120px";
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <CircularLoader size={15} />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 1.5, sm: 2, md: 2.5 },
          height: "100%",
          maxWidth: "100%",
          textAlign: "center",
          overflow: "hidden",
          backgroundColor: theme.palette.customBackground.surface,
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 3, md: 4 },
          minHeight: { xs: "calc(100vh - 120px)", sm: "calc(100vh - 140px)" },
        }}
      >
        {/* App Icon */}
        <Box
          sx={{
            width: getIconSize().width,
            height: getIconSize().height,
            mb: { xs: 2, sm: 3 },
            p: { xs: 1.2, sm: 1.5 },
            borderRadius: { xs: 2.5, sm: 3 },
            boxShadow: "0 6px 15px rgba( 0, 0, 0, 0.2)",
            border: `1px solid ${theme.palette.customBorder.main}`,
            backgroundColor: theme.palette.customBackground.paper,
          }}
        >
          <CardMedia
            image={
              theme.palette.mode === "light"
                ? "/assets/icon/bubble-chat-black.png"
                : "/assets/icon/bubble-chat-white.png"
            }
            sx={{
              width: "100%",
              height: "100%",
            }}
          />
        </Box>

        {/* Animated Title */}
        <Box
          sx={{
            transform: isFocused ? "translateY(-10px)" : "translateY(0)",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            px: { xs: 2, sm: 0 },
          }}
        >
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              fontWeight: 600,
              fontSize: getTitleFontSize(),
              color: theme.palette.text.secondary,
              userSelect: "none",
              transition: "opacity 0.3s ease",
            }}
          >
            Create something amazing
          </Typography>
        </Box>

        {/* Animated Form Container */}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 1, sm: isFocused ? 1.5 : 1 },
            flexDirection: { xs: "row", sm: "row" },
            width: "100%",
            maxWidth: { xs: "100%", sm: "600px", md: "700px" },
          }}
        >
          <Button
            onClick={handleUploadClick}
            onMouseDown={(e) => e.preventDefault()}
            variant="contained"
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              alignItems: "center",
              textTransform: "none",
              gap: 1,
              padding: { xs: 1.5, sm: 2 },
              height: { xs: 35, sm: 40 },
              minWidth: 0,
              width: getButtonWidth(),
              borderRadius: { xs: 18, sm: 20 },
              overflow: "hidden",
              backgroundColor: theme.palette.customButton.background.primary,
              order: { xs: isFocused ? 2 : 1, sm: 1 },
              transition:
                "width 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
              "&:hover": {
                backgroundColor:
                  theme.palette.customButton.hoverBackground.primary,
                transform: "translateY(-1px)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <AddIcon
              sx={{
                fontSize: { xs: 18, sm: 22 },
                flexShrink: 0,
                transition: "transform 0.5s cubic-bezier(.4,0,.2,1)",
              }}
            />

            {!isFocused && (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  fontSize: { xs: 12, sm: 14 },
                  whiteSpace: "nowrap",
                  display: isFocused ? "none" : "block",
                  opacity: isFocused ? 0 : 1,
                  transform: isFocused
                    ? "scale(0.2) translateX(-10px)"
                    : "scale(1) translateX(0)",
                  transition: "opacity 0.15s ease-in-out, transform 0.3s ease",
                }}
              >
                Upload
              </Typography>
            )}
          </Button>

          {/* Animated Input Field */}
          <TextField
            inputRef={inputRef}
            id="outlined-basic"
            variant="outlined"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="How can I help you today?"
            sx={{
              flex: { xs: 1, sm: "none" },
              order: { xs: 1, sm: 2 },
              "& > :not(style)": {
                width: { xs: "100%", sm: getInputWidth() },
                transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
                px: 1,
                color: theme.palette.text.primary,
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: { xs: 18, sm: 20 },
                height: { xs: 35, sm: 40 },
                transition: "all 0.25s cubic-bezier(.4,0,.2,1)",
                "&:hover": {
                  transform: "translateY(-1px)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                },
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
                padding: { xs: "8px 12px", sm: "10px 14px" },
                fontSize: { xs: 12, sm: 14 },
              },
            }}
            InputProps={{
              startAdornment: (
                <IconButton
                  onMouseDown={(e) => e.preventDefault()}
                  sx={{
                    display: { xs: "flex", sm: "none" },
                    width: { xs: 26, sm: 30 },
                    height: { xs: 26, sm: 30 },
                    borderRadius: "50%",
                    backgroundColor:
                      theme.palette.customButton.background.primary,
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.customButton.hoverBackground.primary,
                    },
                  }}
                >
                  <AddIcon
                    sx={{
                      color: theme.palette.customButton.background.secondary,
                      fontSize: { xs: 14, sm: 16 },
                      transition: "transform 0.2s ease",
                    }}
                  />
                </IconButton>
              ),
              endAdornment: (
                <IconButton
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSubmit(prompt)}
                  sx={{
                    width: { xs: 26, sm: 30 },
                    height: { xs: 26, sm: 30 },
                    borderRadius: "50%",
                    backgroundColor:
                      theme.palette.customButton.background.secondary,
                    transform: isFocused ? "scale(1.1)" : "scale(1)",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.customButton.hoverBackground.secondary,
                      transform: isFocused ? "scale(1.15)" : "scale(1.05)",
                    },
                  }}
                >
                  <ArrowUpwardIcon
                    sx={{
                      color: theme.palette.customButton.background.primary,
                      fontSize: { xs: 14, sm: 16 },
                      transform: isFocused
                        ? "translateY(-1px)"
                        : "translateY(0)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </IconButton>
              ),
            }}
          />
        </Box>

        {/* Predefined Prompts */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 1, sm: 1.5 },
            mt: { xs: 0.5, sm: 1 },
            maxWidth: { xs: "100%", sm: "500px", md: "600px" },
            px: { xs: 1, sm: 0 },
          }}
        >
          {predefinedPrompts.map((prompt, index) => (
            <Chip
              key={index}
              size={isMobile ? "small" : "small"}
              label={prompt.label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleAddprompt(prompt.value)}
              sx={{
                borderRadius: { xs: 10, sm: 12 },
                textTransform: "none",
                fontSize: { xs: 11, sm: 12 },
                px: { xs: 1.2, sm: 1.3 },
                py: { xs: 0.2, sm: 0.3 },
                height: { xs: 26, sm: 30 },
                transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor: theme.palette.customBackground.chips,
                  transform: "translateY(-1px)",
                },
                "& .MuiChip-label": {
                  px: { xs: 0.5, sm: 1 },
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
