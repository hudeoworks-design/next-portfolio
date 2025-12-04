// app/layout.tsx
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import StyledRoot from '../StyledRoot';
import LocaleSwitch from '@/components/i18n/local-switch';
import type { Metadata } from 'next';
import { getLayoutDirection } from '@/lib/utils';
import { Locale } from '@/lib/types';
import "@/app/assets/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Subash Maharjan",
    default: "Subash Maharjan",
  },
  description: "This is smart portfolio website with custom AI chatbot.",
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

// This is the root layout for the application.
// It wraps the entire application with necessary providers and styles.
// It uses the AppRouterCacheProvider for caching and StyledRoot for styling.
// The layout also includes metadata for the application.
// The layout is designed to be used with Next.js and Material-UI.
// The `children` prop is used to render the application's content within the layout.
// The `suppressHydrationWarning` is used to prevent hydration warnings in Next.js.
// The `antialiased` class is applied to the body for better font rendering.  

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning dir={getLayoutDirection(locale)}>
      <body className="antialiased" suppressHydrationWarning>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <StyledRoot>
            {children}
            <LocaleSwitch />
          </StyledRoot>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}