"use client";
import { ReactNode, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useThemeContext } from "@/context/ThemeContext";
import { StateProvider } from "@/context/StateContext";
import { getAppTheme } from "@/theme/Theme";
import { HydrationWrapper } from "@/components/HydrationWrapper/HydrationWrapper";
import MainLayout from "@/components/MainLayout/MainLayout";

function MainContent({ children }: { children: ReactNode }) {
  const { effectiveTheme, isHydrated } = useThemeContext();

  const appTheme = getAppTheme(effectiveTheme);

  useEffect(() => {
    if (isHydrated) {
      const html = document.documentElement;
      html.className = html.className.replace(/theme-\w+/g, "").trim();
      html.classList.add(`theme-${effectiveTheme}`);

      document.documentElement.style.setProperty(
        "--mui-bg-color",
        appTheme.palette.customBackground.main
      );
      document.body.style.background = appTheme.palette.customBackground.main;
    }
  }, [isHydrated, effectiveTheme, appTheme]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <MainLayout>{children}</MainLayout>
    </ThemeProvider>
  );
}

export default function Main({ children }: { children: ReactNode }) {
  return (
    <HydrationWrapper>
      <StateProvider>
        <MainContent>{children}</MainContent>
      </StateProvider>
    </HydrationWrapper>
  );
}
