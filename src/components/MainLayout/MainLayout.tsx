"use client";

import React, { ReactNode, ReactElement } from "react";
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
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down("md"));

  const contentMarginLeft = isTabletOrBelow ? 0 : SIDEBAR_WIDTH;
  const contentWidth = isTabletOrBelow
    ? "100%"
    : `calc(100% - ${SIDEBAR_WIDTH}px)`;

  return (
    <>
      <Navbar height={CONTENT_MARGIN_TOP} />
      {!isTabletOrBelow && <Sidebar width={SIDEBAR_WIDTH} />}
      <Box
        component="main"
        sx={{
          position: "relative",
          height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          width: contentWidth,
          marginLeft: `${contentMarginLeft}px`,
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
