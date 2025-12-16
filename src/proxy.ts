// proxy.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest } from 'next/server';

// 1. Initialize next-intl routing
const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // 2. Execute i18n routing
  // This handles the [locale] prefix for all pages, including MDX
  return handleI18nRouting(request);
}

export const config = {
  // 3. Matcher for all page routes (including MDX)
  // Excludes internal Next.js paths and files with extensions (images, etc.)
  matcher: [
    // Match the root
    '/', 
    // Match all localized paths (e.g., /en/about, /de/blog/post-1)
    '/(ar|en|es|ne)/:path*', 
    // Standard catch-all that excludes system assets
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ]
};
