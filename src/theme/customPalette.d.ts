import { Palette, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customText: {
      primary: string;
      secondary: string;
    };

    customDivider: {
      primary: string;
    };

    customBorder: {
      main: string;
    };

    customBackground: {
      main: string;
      surface: string;
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

    customBorder: {
      main?: string;
    };

    customDivider: {
      primary?: string;
    };

    customBackground: {
      main?: string;
      surface?: string;
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
