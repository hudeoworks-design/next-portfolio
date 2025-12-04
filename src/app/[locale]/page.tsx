// import Experience from "@/components/Experience";
// import Feedbacks from "@/components/Feedbacks";
// import About from "@/components/pages/About";
// import Contact from "@/components/pages/Contact";
// import Works from "@/components/pages/Works";
import I18NProvider from "@/components/i18n/i18n-provider";
import Hero from "@/components/shared/Hero";
import { serverSideTranslations } from "@/lib/i18n/i18n";
// import Navbar from "@/components/shared/Navbar";
// import StarsCanvas from "@/components/shared/StarsCanvas";
// import Tech from "@/components/Tech";

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: Props) {
  const {locale} = await params
  const ns = ["home"]; // namespace used for this page
  const { t, resources } = await serverSideTranslations(locale, ns);

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("description")}</p>
      
      <I18NProvider locale={locale} namespaces={ns} resources={resources}>
        <Hero title={""} />
      </I18NProvider>
    </div>
  );
}