import { PaletteOptions, lighten, darken } from "@mui/material";
import { colors } from "./tokens";

export const lightPalette: PaletteOptions = {
  mode: "light",
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
    background: `linear-gradient(180deg, #ffffff 10%, ${lighten(
      colors.grey[200],
      0.5
    )})`,
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
    tagColor: colors.primary[600],
  },
  button: {
    disabledBgColor: colors.grey[200],
    disabledColor: colors.grey[400],
  },
  grey: colors.grey,
};