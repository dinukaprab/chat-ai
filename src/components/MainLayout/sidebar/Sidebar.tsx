import React from "react";
import { Box, useTheme } from "@mui/material";

interface SidebarProps {
  width: number;
}

export default function Sidebar({ width }: SidebarProps) {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: `${width}px`,
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          backgroundColor: theme.palette.customBackground.main,
        }}
      ></Box>
    </>
  );
}
