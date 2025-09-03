import { useEffect, useMemo, useCallback, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type ThemeType = "light" | "dark" | "system";

export interface AppSettings {
  theme: ThemeType;
  sidebarOpen: boolean;
}

export const defaultSettings: AppSettings = {
  theme: "system",
  sidebarOpen: true,
};

export function useAppSettings() {
  const userId = "user-KKmaW89a9xEdZdFhbpaQ0RYn";
  const storageKey = `cache/${userId}/app-settings`;
  const [isLoaded, setIsLoaded] = useState(false);

  const [appSettings, setAppSettings] = useLocalStorage<AppSettings>(
    storageKey,
    defaultSettings
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoaded(true);

      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsedSettings = JSON.parse(stored) as AppSettings;
          if (JSON.stringify(parsedSettings) !== JSON.stringify(appSettings)) {
            setAppSettings(parsedSettings);
          }
        }
      } catch (error) {
        console.error("Settings sync error:", error);
      }
    }
  }, [storageKey]);

  const memoizedSettings = useMemo(() => appSettings, [appSettings]);

  const optimizedSetSettings = useCallback(
    (newSettings: AppSettings | ((prev: AppSettings) => AppSettings)) => {
      setAppSettings((prev) => {
        const updated =
          typeof newSettings === "function" ? newSettings(prev) : newSettings;

        const validatedSettings: AppSettings = {
          theme: updated.theme || defaultSettings.theme,
          sidebarOpen:
            typeof updated.sidebarOpen === "boolean"
              ? updated.sidebarOpen
              : defaultSettings.sidebarOpen,
        };

        return validatedSettings;
      });
    },
    [setAppSettings]
  );

  return {
    settings: memoizedSettings,
    setSettings: optimizedSetSettings,
    isLoaded,
  };
}
