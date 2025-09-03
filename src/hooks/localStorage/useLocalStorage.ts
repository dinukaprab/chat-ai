import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.error("LocalStorage read error:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const item = localStorage.getItem(key);
      if (item) {
        const parsedItem = JSON.parse(item) as T;
        setStoredValue(parsedItem);
      }
    } catch (error) {
      console.error("LocalStorage sync error:", error);
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const currentStoredValue = (() => {
          if (typeof window === "undefined") return storedValue;

          try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : storedValue;
          } catch {
            return storedValue;
          }
        })();

        const valueToStore =
          value instanceof Function ? value(currentStoredValue) : value;

        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error("LocalStorage write error:", error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
}
