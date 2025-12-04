import type { Locale } from "../types";

export function getLayoutDirection(locale: Locale) {
  if (locale === "ar") {
    return "rtl";
  }
  return "ltr";
}