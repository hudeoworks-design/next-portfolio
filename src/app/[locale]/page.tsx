import I18NProvider from "@/components/i18n/i18n-provider";
import Hero from "@/components/shared/Hero";
import { serverSideTranslations } from "@/lib/i18n/i18n";
import { promises as fs } from 'fs';
import path from 'path';
import Navbar from "@/components/shared/Navbar";

// import content from '../../lib/i18n/locales/en.json';
// import Navbar from "@/components/shared/Navbar";
// import StarsCanvas from "@/components/shared/StarsCanvas";
// import Tech from "@/components/Tech";
// import Experience from "@/components/Experience";
// import Feedbacks from "@/components/Feedbacks";
// import About from "@/components/pages/About";
// import Contact from "@/components/pages/Contact";
// import Works from "@/components/pages/Works";


type Props = {
  params: Promise<{ locale: string }>
}

async function getData(locale: string) {
  const filePath = path.join(process.cwd(), `src/lib/i18n/locales/${locale}.json`);
  const fileContent = await fs.readFile(filePath, 'utf8');
  const translations = JSON.parse(fileContent);

  return translations;
}

export default async function Page({params}: Props) {
  
  const {locale} = await params
  const ns = ["home"]; // namespace used for this page
  const { resources } = await serverSideTranslations(locale, ns);

  const { heroData } = await getData(locale) ?? {};

  return (
    <I18NProvider locale={locale} namespaces={ns} resources={resources}> 
      <Navbar />      
      <Hero heroData={heroData} />
    </I18NProvider>
  );
}