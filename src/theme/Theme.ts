import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customBackground: {
      main: string;
    };
  }
  interface PaletteOptions {
    customBackground: {
      main?: string;
    };
  }
}
export const getAppTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#282828" : "#fff",
        light: mode === "light" ? "#42a5f5" : "#f5f5f5",
        dark: mode === "light" ? "#1c1c1c" : "#e0e0e0",
        contrastText: mode === "light" ? "#fff" : "#000",
      },
      customBackground: {
        main: mode === "light" ? "#f3f3f3" : "#131313",
      },
    },
  });
