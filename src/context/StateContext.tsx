"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";
import { SnackbarProvider } from "./SnackbarContext";

export const StateProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  );
};
