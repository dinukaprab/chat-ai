"use client";

import React, { ReactNode, ReactElement } from "react";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { Box, useTheme } from "@mui/material";

const NAVBAR_HEIGHT = 65;
const SIDEBAR_WIDTH = 225;
const CONTENT_MARGIN_LEFT = 216;
const CONTENT_MARGIN_TOP = 55;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const theme = useTheme();
  return (
    <>
      <Navbar height={CONTENT_MARGIN_TOP} />
      <Sidebar width={CONTENT_MARGIN_LEFT} />
      <Box
        component="main"
        sx={{
          position: "relative",
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          marginLeft: `${CONTENT_MARGIN_LEFT}px`,
          marginTop: `${CONTENT_MARGIN_TOP}px`,
          borderRadius: 3,
          backgroundColor: theme.palette.customBackground.surface,
          border: `2px solid ${theme.palette.customBorder.main}`,
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </>
  );
}
