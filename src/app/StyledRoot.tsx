// app/StyledRoot.tsx
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme'; // Import the theme from theme.ts

export default function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}