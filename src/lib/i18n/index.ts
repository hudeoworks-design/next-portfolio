import { AllowedLocales, Locale, I18NConfig } from "@/lib/types";

export const defaultLocale = "en";

export const allowedLocales: AllowedLocales = [defaultLocale, "ar"];

const i18nConfig: I18NConfig = {
  locales: allowedLocales,
  defaultLocale,
  prefixDefault: false, // avoids prefixing the default locale in URLs
};

export { i18nConfig };