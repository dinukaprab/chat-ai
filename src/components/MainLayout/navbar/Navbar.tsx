import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import AccountPopover from "./AccountPopover";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VerticalSplitOutlinedIcon from "@mui/icons-material/VerticalSplitOutlined";

interface NavbarProps {
  height: number;
  width: number;
  handleMoveSidebar?: () => void;
}

export default function Navbar({
  height,
  width,
  handleMoveSidebar,
}: NavbarProps) {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: `${height}px`,
          position: "fixed",
          top: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
          backgroundColor: theme.palette.customBackground.main,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            width: `${width - 30}px`,
            height: "100%",
            ml: 1,
          }}
        >
          <IconButton
            onClick={handleMoveSidebar}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: "8px 10px",
              borderRadius: 1.5,
              "&:hover": {
                backgroundColor: theme.palette.customDivider.primary,
              },
            }}
          >
            <VerticalSplitOutlinedIcon
              sx={{
                fontSize: 22,
                color: theme.palette.customText.secondary,
              }}
            />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mr: 2.5,
            gap: 1.5,
          }}
        >
          <IconButton>
            <SettingsOutlinedIcon
              sx={{
                fontSize: 20,
                color: theme.palette.customText.secondary,
                animation: "spin 8s linear infinite",
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
          </IconButton>

          <AccountPopover />
        </Box>
      </Box>
    </>
  );
}
