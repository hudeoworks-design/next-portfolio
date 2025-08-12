// app/StyledRoot.tsx
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export default function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}