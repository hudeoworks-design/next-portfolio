// app/StyledRoot.tsx
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme'; // Import the theme from theme.ts

// This component is used to wrap the application with the Material-UI theme and CssBaseline.
// It ensures that the theme is applied globally and provides a consistent styling foundation.
// The `disableTransitionOnChange` prop is used to disable transitions when the theme changes. 

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