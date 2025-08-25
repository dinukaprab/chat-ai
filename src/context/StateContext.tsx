"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type ThemeMode = "light" | "dark" | "system";

type StateContextType = {
  themeMode: ThemeMode;
  setThemeMode: React.Dispatch<React.SetStateAction<ThemeMode>>;
  effectiveTheme: "light" | "dark";
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateSystemTheme = () => {
      setSystemTheme(darkQuery.matches ? "dark" : "light");
    };

    updateSystemTheme();
    darkQuery.addEventListener("change", updateSystemTheme);

    return () => darkQuery.removeEventListener("change", updateSystemTheme);
  }, []);

  const effectiveTheme = themeMode === "system" ? systemTheme : themeMode;

  return (
    <StateContext.Provider value={{ themeMode, setThemeMode, effectiveTheme }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within StateProvider");
  }
  return context;
};
