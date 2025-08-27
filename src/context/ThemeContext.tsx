"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextType = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  effectiveTheme: "light" | "dark";
  isHydrated: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("system");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemTheme(darkQuery.matches ? "dark" : "light");

    const updateSystemTheme = () => {
      setSystemTheme(darkQuery.matches ? "dark" : "light");
    };

    darkQuery.addEventListener("change", updateSystemTheme);
    return () => darkQuery.removeEventListener("change", updateSystemTheme);
  }, []);

  useEffect(() => {
    setIsHydrated(true);
    try {
      const saved = localStorage.getItem("themeMode") as ThemeMode | null;
      if (saved && ["light", "dark", "system"].includes(saved)) {
        setThemeModeState(saved);
      }
    } catch (error) {
      console.warn("Could not access localStorage:", error);
    }
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem("themeMode", mode);
    } catch (error) {
      console.warn("Could not save to localStorage:", error);
    }
  };

  const effectiveTheme = themeMode === "system" ? systemTheme : themeMode;

  return (
    <ThemeContext.Provider
      value={{ themeMode, setThemeMode, effectiveTheme, isHydrated }}
    >
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
