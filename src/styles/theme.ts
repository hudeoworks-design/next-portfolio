"use client";

import {
  createTheme,
  ThemeOptions,
} from "@mui/material";
import { font } from "./themes/tokens";
import { Poppins } from "next/font/google";
import { lightPalette, darkPalette } from "./themes";

// 1. Module Augmentation (Required for custom palette keys)
declare module "@mui/material/styles" {
  interface Palette {
    banner: { background: string };
    blog: {
      headerBgColor: string;
      h1Color: string;
      preBorderColor: string;
      preBgColor: string;
      codeBgColor: string;
      codeColor: string;
      linkColor: string;
    };
    subscribe: { headerColor: string };
    about: {
      headerTitle: string;
      headerText: string;
      sectionBorder: string;
      sectionTitle: string;
      sectionText: string;
      sectionIcon: string;
    };
    postCard: { tagBgColor: string };
    blogs: { tagBgColor: string; tagSelectedColor: string; tagColor: string };
    button: { disabledBgColor: string; disabledColor: string };
  }
  interface PaletteOptions {
    banner?: { background: string };
    blog?: {
      headerBgColor: string;
      h1Color: string;
      preBorderColor: string;
      preBgColor: string;
      codeBgColor: string;
      codeColor: string;
      linkColor: string;
    };
    subscribe?: { headerColor: string };
    about?: {
      headerTitle: string;
      headerText: string;
      sectionBorder: string;
      sectionTitle: string;
      sectionText: string;
      sectionIcon: string;
    };
    postCard?: { tagBgColor: string };
    blogs?: { tagBgColor: string; tagSelectedColor: string; tagColor: string };
    button?: { disabledBgColor: string; disabledColor: string };
  }
}

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const getThemeOptions = (
  mode: "light" | "dark",
  direction: "ltr" | "rtl"
): ThemeOptions => ({
  direction,
  cssVariables: {
    colorSchemeSelector: "class", // Syncs with next-themes .dark class
  },
  palette: mode === "light" ? lightPalette : darkPalette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Capitalize is usually discouraged for UX
          borderRadius: 0, // "8px",
          "&.Mui-disabled": {
            backgroundColor: "var(--mui-palette-button-disabledBgColor)",
            color: "var(--mui-palette-button-disabledColor)",
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 0, // "12px",
          border: "1px solid var(--mui-palette-divider)",
        },
      },
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
    // Note: ensure font.size tokens match MUI expected format (h1, body1, etc)
    ...font.size,
  },
  shape: {
    borderRadius: 0, // 8,
  },
  // Spacing and Shadows must be properly mapped
  spacing: 8,
});

export const createAppTheme = (
  mode: "light" | "dark",
  direction: "ltr" | "rtl"
) => {
  return createTheme(getThemeOptions(mode, direction));
};
