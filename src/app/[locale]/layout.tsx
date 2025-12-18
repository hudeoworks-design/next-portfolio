// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { getLayoutDirection } from '@/lib/utils';
import { CustomThemeProvider } from '@/components/CustomThemeProvider';
import { getMessages } from 'next-intl/server';
import { Roboto } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: {
    template: "%s | Subash Maharjan",
    default: "Subash Maharjan",
  },
  description: "This is smart portfolio website with custom AI chatbot.",
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={roboto.variable} suppressHydrationWarning dir={getLayoutDirection(locale)} data-scroll-behavior="smooth">
      <body className="antialiased" suppressHydrationWarning>
        <CustomThemeProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
