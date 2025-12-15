/**
 * Determines the layout direction (LTR or RTL) based on the provided locale code.
 * @param locale The locale string (e.g., 'en', 'ar').
 * @returns 'rtl' for Arabic, otherwise 'ltr'.
 */
export function getLayoutDirection(locale: string): 'ltr' | 'rtl' {
  if (locale === "ar") {
    return "rtl";
  }
  return "ltr";
}
