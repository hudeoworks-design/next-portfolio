// app/layout.tsx
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import StyledRoot from './StyledRoot';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Next Portfolio",
  description: "This is smart portfolio website with custom AI chatbot.",
};

// This is the root layout for the application.
// It wraps the entire application with necessary providers and styles.
// It uses the AppRouterCacheProvider for caching and StyledRoot for styling.
// The layout also includes metadata for the application.
// The layout is designed to be used with Next.js and Material-UI.
// The `children` prop is used to render the application's content within the layout.
// The `suppressHydrationWarning` is used to prevent hydration warnings in Next.js.
// The `antialiased` class is applied to the body for better font rendering.  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AppRouterCacheProvider>
          <StyledRoot>{children}</StyledRoot>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}