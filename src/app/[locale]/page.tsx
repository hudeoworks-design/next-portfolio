'use client';

import { useScrollTrigger, Fade, Box, Toolbar, Container, Fab } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/pages/home/Hero";
import About from "../../components/pages/About";
import Portfolio from "@/components/pages/Portfolio";

// Other imports that are currently commented out:
// import content from '../../lib/i18n/locales/en.json';
// import StarsCanvas from "@/components/shared/StarsCanvas";
// import Tech from "@/components/Tech";
// import Experience from "@/components/Experience";
// import Feedbacks from "@/components/Feedbacks";
// import Contact from "@/components/pages/Contact";
// import Works from "@/components/pages/Works";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export default function Page(props: Props) {
  return (
    <>
      <Navbar />
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box sx={{ my: 2 }}>
          <Hero />
          <About />
          <Portfolio />
        </Box>
      </Container>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
