import { defineRouting } from "next-intl/routing";

export const defaultLocale = "en";

// Use "as const" to allow TypeScript to infer literal string types for locales
export const allowedLocales = [defaultLocale, "ar", "es", "ne"] as const;

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: allowedLocales,
  
  // Used when no locale matches (e.g. on the root path)
  defaultLocale,
  
  // Replaces prefixDefault: false. 
  // 'as-needed' avoids prefixing the default locale in URLs (e.g. /about instead of /en/about)
  localePrefix: 'as-needed' 
});

// Export the config for use in middleware and navigation helpers
export const i18nConfig = routing;