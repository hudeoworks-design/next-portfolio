// // app/layout.tsx
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
// import StyledRoot from './StyledRoot';
// import type { Metadata } from 'next';
// import { getLayoutDirection } from '@/lib/utils';
// import "@/app/assets/globals.css";
// import { PropsWithChildren } from 'react';

// export const metadata: Metadata = {
//   title: {
//     template: "%s | Subash Maharjan",
//     default: "Subash Maharjan",
//   },
//   description: "This is smart portfolio website with custom AI chatbot.",
// };


// export default async function RootLayout({
//   params,
//   children,
// }: PropsWithChildren<{ params: Promise<{ locale: string }> }>) {
//   const { locale } = await params;
//   return (
//     <html lang={locale} suppressHydrationWarning dir={getLayoutDirection(locale)} data-scroll-behavior="smooth">
//       <body className="antialiased" suppressHydrationWarning>
//         <AppRouterCacheProvider options={{ enableCssLayer: true }}>
//           <StyledRoot>
//             {children}
//           </StyledRoot>
//         </AppRouterCacheProvider>
//       </body>
//     </html>
//   );
// }

// app/[locale]/layout.tsx
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme'; // Your custom MUI theme
import { getLayoutDirection } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    template: "%s | Subash Maharjan",
    default: "Subash Maharjan",
  },
  description: "This is smart portfolio website with custom AI chatbot.",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Fetch messages on the server for next-intl
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning dir={getLayoutDirection(locale)} data-scroll-behavior="smooth">
      <body className="antialiased" suppressHydrationWarning>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline provides consistent base styles for MUI */}
              <CssBaseline />
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
