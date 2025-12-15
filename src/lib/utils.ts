import path from "path";
import { promises as fs } from "fs";

export function getLayoutDirection(locale: string): string {
  if (locale === "ar") {
    return "rtl";
  }
  return "ltr";
}

export async function getData(locale: string) {
  const filePath = path.join(
    process.cwd(),
    `src/lib/i18n/locales/${locale}.json`
  );
  const fileContent = await fs.readFile(filePath, "utf8");
  const translations = JSON.parse(fileContent);

  return translations;
}
