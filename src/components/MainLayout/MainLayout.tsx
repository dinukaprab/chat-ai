"use client";

import React, { ReactNode, ReactElement, useCallback, useState } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const NAVBAR_HEIGHT = 65;
const SIDEBAR_WIDTH = 225;
const CONTENT_MARGIN_TOP = 55;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(!isTabletOrBelow);

  const handleMoveSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleClickSearchChats = useCallback(() => {
    // Open search chats functionality
    console.log("Search Chats clicked");
  }, []);

  const contentMarginLeft = isTabletOrBelow
    ? 0
    : sidebarOpen
    ? SIDEBAR_WIDTH
    : 65;

  const contentWidth = isTabletOrBelow
    ? "100%"
    : sidebarOpen
    ? `calc(100% - ${SIDEBAR_WIDTH}px)`
    : "calc(100% - 65px)";

  return (
    <>
      <Navbar
        height={CONTENT_MARGIN_TOP}
        width={SIDEBAR_WIDTH}
        handleMoveSidebar={handleMoveSidebar}
      />

      {!isTabletOrBelow && (
        <Sidebar
          height={CONTENT_MARGIN_TOP}
          width={sidebarOpen ? SIDEBAR_WIDTH : 65}
          isSidebarOpen={sidebarOpen}
          handleClickSearchChats={handleClickSearchChats}
        />
      )}

      <Box
        component="main"
        sx={{
          position: "relative",
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          width: contentWidth,
          marginLeft: {
            xs: `${contentMarginLeft - 3}px`,
            sm: `${contentMarginLeft - 6}px`,
            md: `${contentMarginLeft - 9}px`,
          },
          marginTop: `${CONTENT_MARGIN_TOP}px`,
          borderRadius: 3,
          backgroundColor: theme.palette.customBackground.surface,
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {children}
      </Box>
    </>
  );
}
