"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useAppSettings, ThemeType } from "@/hooks";

type ThemeContextType = {
  themeMode: ThemeType;
  setThemeMode: (mode: ThemeType) => void;
  effectiveTheme: "light" | "dark";
  activeTheme: ThemeType;
  isHydrated: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const { settings, setSettings, isLoaded } = useAppSettings();
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() =>
    getInitialSystemTheme()
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const systemThemeListenerRef = useRef<MediaQueryList | null>(null);

  const themeMode = useMemo(() => settings.theme, [settings.theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    systemThemeListenerRef.current = darkQuery;

    const updateSystemTheme = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    darkQuery.addEventListener("change", updateSystemTheme);
    setIsHydrated(true);

    return () => {
      darkQuery.removeEventListener("change", updateSystemTheme);
    };
  }, []);

  const setThemeMode = useCallback(
    (mode: ThemeType) => {
      setSettings((prev) => ({
        ...prev,
        theme: mode,
      }));
    },
    [setSettings]
  );

  const effectiveTheme = useMemo((): "light" | "dark" => {
    return themeMode === "system" ? systemTheme : themeMode;
  }, [themeMode, systemTheme]);

  const contextValue = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      effectiveTheme,
      activeTheme: settings.theme,
      isHydrated: isHydrated && isLoaded,
    }),
    [
      themeMode,
      setThemeMode,
      effectiveTheme,
      settings.theme,
      isHydrated,
      isLoaded,
    ]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};
