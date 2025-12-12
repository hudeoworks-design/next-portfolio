import Hero from "@/components/shared/Hero";
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


export default async function Page() {

  return (
    <div> 
      <Navbar />      
      <Hero />
    </div>
  );
}