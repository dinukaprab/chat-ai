"use client";

import React, { ReactNode, ReactElement, useCallback, useMemo } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { useAppSettings } from "@/hooks";

const NAVBAR_HEIGHT = 65;
const SIDEBAR_WIDTH = 225;
const CONTENT_MARGIN_TOP = 55;
const SIDEBAR_COLLAPSED_WIDTH = 65;

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down("md"));
  const { settings, setSettings } = useAppSettings();

  const sidebarOpen = settings.sidebarOpen;

  const handleMoveSidebar = useCallback(
    (value: boolean) => {
      setSettings((prev) => ({
        ...prev,
        sidebarOpen: value,
      }));
    },
    [setSettings]
  );

  const handleClickSearchChats = useCallback(() => {
    console.log("Search Chats clicked");
  }, []);

  const layoutMetrics = useMemo(() => {
    const contentMarginLeft = isTabletOrBelow
      ? 0
      : sidebarOpen
      ? SIDEBAR_WIDTH
      : SIDEBAR_COLLAPSED_WIDTH;

    const contentWidth = isTabletOrBelow
      ? "100%"
      : sidebarOpen
      ? `calc(100% - ${SIDEBAR_WIDTH}px)`
      : `calc(100% - ${SIDEBAR_COLLAPSED_WIDTH}px)`;

    const sidebarWidth = sidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH;

    return {
      contentMarginLeft,
      contentWidth,
      sidebarWidth,
    };
  }, [isTabletOrBelow, sidebarOpen]);

  const responsiveMargins = useMemo(
    () => ({
      xs: `${layoutMetrics.contentMarginLeft - 3}px`,
      sm: `${layoutMetrics.contentMarginLeft - 6}px`,
      md: `${layoutMetrics.contentMarginLeft - 9}px`,
    }),
    [layoutMetrics.contentMarginLeft]
  );

  const mainContentStyles = useMemo(
    () => ({
      position: "relative" as const,
      height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      width: layoutMetrics.contentWidth,
      marginLeft: responsiveMargins,
      marginTop: `${CONTENT_MARGIN_TOP}px`,
      borderRadius: 3,
      backgroundColor: theme.palette.customBackground.surface,
      overflow: "hidden" as const,
      transition: "all 0.3s ease",
    }),
    [
      layoutMetrics.contentWidth,
      responsiveMargins,
      theme.palette.customBackground.surface,
    ]
  );

  return (
    <>
      <Navbar
        height={CONTENT_MARGIN_TOP}
        width={SIDEBAR_WIDTH}
        sidebarOpen={sidebarOpen}
        handleMoveSidebar={handleMoveSidebar}
      />

      {!isTabletOrBelow && (
        <Sidebar
          height={CONTENT_MARGIN_TOP}
          width={layoutMetrics.sidebarWidth}
          isSidebarOpen={sidebarOpen}
          handleClickSearchChats={handleClickSearchChats}
        />
      )}

      <Box component="main" sx={mainContentStyles}>
        {children}
      </Box>
    </>
  );
}
