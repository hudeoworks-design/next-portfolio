"use client";

import { I18nextProvider } from "react-i18next";
import { createInstance, type Resource } from "i18next";
import { serverSideTranslations } from "@/lib/i18n/i18n";

type Props = {
  children: React.ReactNode;
  locale: string;
  namespaces: string[];
  resources: Resource;
};

export default function I18NProvider({
  children,
  locale,
  namespaces,
  resources,
}: Props) {
  const i18n = createInstance();

  // Initialize client-side i18n instance with resources provided by the server
  serverSideTranslations(locale, namespaces, { i18nInstance: i18n, resources });

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
