// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import { getLayoutDirection } from '@/lib/utils';
import { CustomThemeProvider } from '@/components/CustomThemeProvider';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Roboto } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? 'https://subashmaharjan.com' 
    : 'http://localhost:3000'),
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

   // Validate locale immediately to prevent 404 on deep links
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Mandatory for static rendering in Next.js 15
  // CRITICAL: Call this before any next-intl hooks or components
  setRequestLocale(locale); 

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

// To avoid the "blocking-route" error entirely, Next.js needs to know which locales are valid at build time so it can pre-render the "static shell".
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Rules to fix issues: 
// Params are Promises: Always await params in layouts and pages.
// Explicit Static Signal: Use setRequestLocale(locale) in every layout and page file within the [locale] segment to prevent Next.js from bailing out to dynamic rendering.
// Suspense Requirement: If you must access truly dynamic data (like cookies() or headers()) in your layout, wrap the children or the specific dynamic component in a <Suspense> boundary. 
