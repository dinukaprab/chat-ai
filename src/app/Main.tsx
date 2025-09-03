"use client";
import { ReactNode, useEffect, useMemo, useRef } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider, useThemeContext } from "@/context/ThemeContext";
import { StateProvider } from "@/context/StateContext";
import { getAppTheme } from "@/theme/Theme";
import { HydrationWrapper } from "@/components/HydrationWrapper/HydrationWrapper";
import MainLayout from "@/components/MainLayout/MainLayout";

const lightTheme = getAppTheme("light");
const darkTheme = getAppTheme("dark");

function MainContent({ children }: { children: ReactNode }) {
  const { effectiveTheme, isHydrated } = useThemeContext();
  const initializedRef = useRef(false);

  const appTheme = useMemo(() => {
    return effectiveTheme === "dark" ? darkTheme : lightTheme;
  }, [effectiveTheme]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    html.className = html.className.replace(/theme-\w+/g, "").trim();
    html.classList.add(`theme-${effectiveTheme}`);

    const bgColor = appTheme.palette.customBackground.main;
    document.documentElement.style.setProperty("--mui-bg-color", bgColor);
    body.style.background = bgColor;

    initializedRef.current = true;
  }, [effectiveTheme, appTheme]);

  if (typeof window !== "undefined" || isHydrated) {
    return (
      <MuiThemeProvider theme={appTheme}>
        <CssBaseline />
        <MainLayout>{children}</MainLayout>
      </MuiThemeProvider>
    );
  }

  return (
    <MuiThemeProvider theme={lightTheme}>
      <CssBaseline />
      <MainLayout>{children}</MainLayout>
    </MuiThemeProvider>
  );
}

export default function Main({ children }: { children: ReactNode }) {
  return (
    <HydrationWrapper>
      <StateProvider>
        <ThemeProvider>
          <MainContent>{children}</MainContent>
        </ThemeProvider>
      </StateProvider>
    </HydrationWrapper>
  );
}
