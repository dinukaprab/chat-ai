import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const getAppTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,

      primary: {
        main: mode === "light" ? "#282828" : "#fff",
        light: mode === "light" ? "#42a5f5" : "#f5f5f5",
        dark: mode === "light" ? "#1c1c1c" : "#e0e0e0",
        contrastText: mode === "light" ? "#ffffff" : "#000000",
      },

      customText: {
        primary: mode === "light" ? "#282828" : "#ffffff",
        secondary: mode === "light" ? "#282828e6" : "#dcdcdc",
      },

      customButton: {
        background:{
          primary: mode === "light" ? "#282828" : "#f2f2f2",
          secondary: mode === "light" ? "#ececec" : "#3c3c3c",
        },
        hoverBackground:{
          primary: mode === "light" ? "#404040" : "#f2f2f2e6",
          secondary: mode === "light" ? "#dadada" : "#d0d0fc33",
        }
      },

      customDivider: {
        primary: mode === "light" ? "#e2e2e2" : "#424242",
      },

      customBorder: {
        main: mode === "light" ? "#f0f0f0" : "#1c1c1c",
        surface: mode === "light" ? "#d0d0d0" : "#595959",
      },

      customBackground: {
        main: mode === "light" ? "#f3f3f3" : "#131313",
        paper: mode === "light" ? "#ffffff" : "#303030",
        surface: mode === "light" ? "#ffffff" : "#212121",
        chips: mode === "light" ? "#f0f0f0" : "#595959",
      },

      popoverContainer: {
        themePanel: {
          background: mode === "light" ? "#ededed" : "#0d0d0d",
          activeBackground: mode === "light" ? "#ffffff" : "#282828",
          activeIcon: mode === "light" ? "#282828" : "#ffffff",
          inactiveIcon: mode === "light" ? "#282828b3" : "#ffffffb3",
          inactiveIconHover: mode === "light" ? "#2828281a" : "#ffffff1a",
        },
        menuList: {
          background: "#1877f214",
          backgroundHover: "#1877f229",
        },
      },
    },

    typography: {
      fontFamily: inter.style.fontFamily,
      h1: { fontFamily: inter.style.fontFamily },
      h2: { fontFamily: inter.style.fontFamily },
      h3: { fontFamily: inter.style.fontFamily },
      h4: { fontFamily: inter.style.fontFamily },
      h5: { fontFamily: inter.style.fontFamily },
      h6: { fontFamily: inter.style.fontFamily },
      subtitle1: { fontFamily: inter.style.fontFamily },
      subtitle2: { fontFamily: inter.style.fontFamily },
      body1: { fontFamily: inter.style.fontFamily },
      body2: { fontFamily: inter.style.fontFamily },
      button: { fontFamily: inter.style.fontFamily },
      caption: { fontFamily: inter.style.fontFamily },
      overline: { fontFamily: inter.style.fontFamily },
    },
  });
