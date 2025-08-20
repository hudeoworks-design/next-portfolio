import Experience from "@/components/Experience";
import Feedbacks from "@/components/Feedbacks";
import About from "@/components/pages/About";
import Contact from "@/components/pages/Contact";
import Works from "@/components/pages/Works";
import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar";
import StarsCanvas from "@/components/shared/StarsCanvas";
import Tech from "@/components/Tech";

export default function Home() {
  return (
    <div className="relative z-0 bg-primary font-sans">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero title={""} />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
}
