"use client";

import { createTheme, darken, lighten} from "@mui/material";
import {
  colors,
  font,
} from "./tokens";
import { Poppins } from "next/font/google";

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

const theme = createTheme({
  // Use MUI v6 CSS variables
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.primary[500],
          contrastText: "#ffffff",
          ...colors.primary,
        },
        secondary: {
          main: colors.secondary[500],
          contrastText: "#ffffff",
          ...colors.secondary,
        },
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
        background: {
          default: "#ffffff",
          paper: "#ffffff",
        },
        banner: {
          background: `linear-gradient(180deg, #ffffff 10%, ${lighten(colors.grey[200], 0.5)})`,
        },
        blog: {
          headerBgColor: lighten(colors.secondary[100], 0.4),
          h1Color: colors.secondary[500],
          preBorderColor: colors.secondary[300],
          preBgColor: darken(colors.grey[800], 0.4),
          codeBgColor: colors.grey[200],
          codeColor: colors.secondary[400],
          linkColor: colors.grey[700],
        },
        subscribe: { headerColor: colors.primary[800] },
        about: {
          headerTitle: colors.grey[800],
          headerText: colors.grey[700],
          sectionBorder: colors.secondary[100],
          sectionTitle: colors.grey[800],
          sectionText: colors.grey[700],
          sectionIcon: colors.secondary[500],
        },
        postCard: { tagBgColor: colors.primary[200] },
        blogs: {
          tagBgColor: colors.grey[200],
          tagSelectedColor: colors.primary[400],
          tagColor: colors.primary[600]
        },
        button: {
          disabledBgColor: colors.grey[200],
          disabledColor: colors.grey[400],
        },
        grey: colors.grey,
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.primary[600],
          contrastText: "#ffffff",
          ...colors.primary,
        },
        secondary: {
          main: colors.secondary[900],
          contrastText: "#ffffff",
          ...colors.secondary,
        },
        text: {
          primary: colors.grey[200],
          secondary: colors.grey[400],
        },
        background: {
          default: colors.grey[900],
          paper: "#1e1e1e", // Standard dark mode paper color
        },
        banner: {
          background: "linear-gradient(180deg, var(--mui-palette-grey-900) 61%, #14171e)",
        },
        blog: {
          headerBgColor: "#000000",
          h1Color: colors.secondary[300],
          preBorderColor: colors.secondary[700],
          preBgColor: darken(colors.grey[800], 0.4),
          codeBgColor: colors.grey[800],
          codeColor: colors.secondary[400],
          linkColor: colors.grey[400],
        },
        subscribe: { headerColor: colors.grey[50] },
        about: {
          headerTitle: colors.grey[200],
          headerText: colors.grey[400],
          sectionBorder: colors.secondary[700],
          sectionTitle: colors.grey[200],
          sectionText: colors.grey[400],
          sectionIcon: colors.secondary[300],
        },
        postCard: { tagBgColor: colors.primary[200] },
        blogs: {
          tagBgColor: colors.grey[200],
          tagSelectedColor: colors.primary[400],
          tagColor: colors.primary[600]
        },
        button: {
          disabledBgColor: colors.grey[800],
          disabledColor: colors.grey[600],
        },
        grey: colors.grey,
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Capitalize is usually discouraged for UX
          borderRadius: "8px",
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
          borderRadius: "12px",
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
    borderRadius: 8,
  },
  // Spacing and Shadows must be properly mapped
  spacing: 8, 
});

export default theme;
