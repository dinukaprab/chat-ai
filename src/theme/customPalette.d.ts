import { Palette, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customText: {
      primary: string;
      secondary: string;
    };

    customButton: {
      background: {
        primary: string;
        secondary: string;
      };
      hoverBackground: {
        primary: string;
        secondary: string;
      };
    };

    customDivider: {
      primary: string;
    };

    customBorder: {
      main: string;
      surface: string;
    };

    customBackground: {
      main: string;
      paper: string;
      surface: string;
      chips: string;
    };

    popoverContainer: {
      themePanel: {
        background: string;
        activeBackground: string;
        activeIcon: string;
        inactiveIcon: string;
        inactiveIconHover: string;
      };
      menuList: {
        background: string;
        backgroundHover: string;
      };
    };
  }

  interface PaletteOptions {
    customText: {
      primary?: string;
      secondary?: string;
    };

    customButton: {
      background?: {
        primary?: string;
        secondary?: string;
      };
      hoverBackground?: {
        primary?: string;
        secondary?: string;
      };
    };

    customBorder: {
      main?: string;
      surface?: string;
    };

    customDivider: {
      primary?: string;
    };

    customBackground: {
      main?: string;
      paper?: string;
      surface?: string;
      chips?: string;
    };

    popoverContainer?: {
      themePanel?: {
        background?: string;
        activeBackground?: string;
        activeIcon?: string;
        inactiveIcon?: string;
        inactiveIconHover?: string;
      };
      menuList?: {
        background?: string;
        backgroundHover?: string;
      };
    };
  }
}
