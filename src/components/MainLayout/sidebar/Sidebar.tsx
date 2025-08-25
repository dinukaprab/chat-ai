import React from "react";
import { Box } from "@mui/material";

interface SidebarProps {
  width: number;
}

export default function Sidebar({ width }: SidebarProps) {
  return (
    <>
      <Box
        sx={{
          width: `${width}px`,
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
        }}
      ></Box>
    </>
  );
}
