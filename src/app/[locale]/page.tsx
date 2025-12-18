'use client';

import { useScrollTrigger, Fade, Box, Toolbar, Container, Fab } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Hero from "@/components/pages/home/Hero";
import About from "../../components/pages/About";
import Portfolio from "@/components/pages/Portfolio";
import Blog from "@/components/pages/Blog";
import Contact from "@/components/pages/Contact";

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
    <Container>
      <Toolbar id="back-to-top-anchor" />
      <Box component="section" id="home">
        <Hero />
        <About />
        <Portfolio />
        <Blog />
        <Contact />
      </Box>
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Container>
  );
}
