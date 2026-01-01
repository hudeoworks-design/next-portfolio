import { PaletteOptions, darken } from "@mui/material";
import { colors } from "./tokens";

export const darkPalette: PaletteOptions = {
  mode: "dark",
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
    background:
      "linear-gradient(180deg, var(--mui-palette-grey-900) 61%, #14171e)",
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
    tagColor: colors.primary[600],
  },
  button: {
    disabledBgColor: colors.grey[800],
    disabledColor: colors.grey[600],
  },
  grey: colors.grey,
};