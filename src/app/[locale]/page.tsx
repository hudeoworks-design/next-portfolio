'use client';

import { Box, Container } from "@mui/material";
import Hero from "@/components/pages/home/Hero";
import About from "../../components/pages/About";
import Portfolio from "@/components/pages/Portfolio";
import Blog from "@/components/pages/Blog";
import Contact from "@/components/pages/Contact";

export default function Page() {
  return (
    <Container>
      <Box component="section" id="home">
        <Hero />
        <About />
        <Portfolio />
        <Blog />
        <Contact />
      </Box>
    </Container>
  );
}
