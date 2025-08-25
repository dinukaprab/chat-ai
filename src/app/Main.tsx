"use client";
import { ReactNode } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useStateContext, StateProvider } from "@/context/StateContext";
import { getAppTheme } from "@/theme/Theme";
import MainLayout from "@/components/MainLayout/MainLayout";

function MainContent({ children }: { children: ReactNode }) {
  const { effectiveTheme } = useStateContext();
  const appTheme = getAppTheme(effectiveTheme);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <body style={{ background: appTheme.palette.customBackground.main }}>
        <MainLayout>{children}</MainLayout>
      </body>
    </ThemeProvider>
  );
}

export default function Main({ children }: { children: ReactNode }) {
  return (
    <StateProvider>
      <MainContent>{children}</MainContent>
    </StateProvider>
  );
}
