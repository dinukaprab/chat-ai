"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeContext";

export const StateProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
