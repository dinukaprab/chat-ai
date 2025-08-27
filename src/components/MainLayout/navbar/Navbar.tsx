import React from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import AccountPopover from "./AccountPopover";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

interface NavbarProps {
  height: number;
}

export default function Navbar({ height }: NavbarProps) {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: `calc(100% - ${height}px)`,
          height: `${height}px`,
          position: "fixed",
          top: 0,
          right: 0,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          zIndex: 10,
          backgroundColor: theme.palette.customBackground.main,
        }}
      >
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
