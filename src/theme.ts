// theme.ts
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
  },
});

export const darkTheme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
  },
});