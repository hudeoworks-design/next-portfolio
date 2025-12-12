'use client'; // Required for MUI hooks and interactivity in App Router

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Slide,
  Typography,
  IconButton,
  Container,
  Box,
} from '@mui/material/';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Mail as MailIcon,
  PermIdentity as PermIdentityIcon,
} from '@mui/icons-material';
import { useParams } from 'next/navigation'; // Correct hook for App Router locale

import Link from '../Link';
import AnimatedLink from '../AnimatedLink';
import LanguageSelector from '../i18n/LanguageSelector';
import NavigationDrawer from './NavigationDrawer';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll({ children }: Props) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

type LocaleKeys = 'home' | 'about' | 'portfolio' | 'contact' | 'blog';

const localeNames: Record<string, Record<LocaleKeys, string>> = {
  ar: {
    home: 'الرئيسية',
    about: 'من أنا',
    portfolio: 'أعمالي',
    contact: 'اتصل بي',
    blog: 'المدونة',
  },
  en: {
    home: 'HOME',
    about: 'ABOUT',
    portfolio: 'PORTFOLIO',
    contact: 'CONTACT',
    blog: 'BLOG',
  },
  es: {
    home: 'INICIO',
    about: 'ACERCA DE MI',
    portfolio: 'PORTAFOLIO',
    contact: 'CONTACTO',
    blog: 'BLOG',
  },
};


export default function ElevateAppBar() {
  const params = useParams();
  
  // App Router typically uses a dynamic [lang] or [locale] segment
  // Assumes your folder is app/[lang]/page.tsx
  const currentLocale = params.locale as string || 'en';

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { link: '/', name: localeNames[currentLocale].home, icon: <HomeIcon /> },
    { link: '/#about', name: localeNames[currentLocale].about, icon: <PermIdentityIcon /> },
    { link: '/#portfolio', name: localeNames[currentLocale].portfolio, icon: <WorkIcon /> },
    { link: '/#blog', name: localeNames[currentLocale].blog, icon: <AssignmentIcon /> },
    { link: '/#contact', name: localeNames[currentLocale].contact, icon: <MailIcon /> },
  ];

  return (
    <nav id="navbar">
      <HideOnScroll>
        <AppBar elevation={0} color="inherit" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography
                variant="h3"
                component={Link}
                href="/"
                color="primary"
                sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: 'bold' }}
              >
                SM
              </Typography>

              {/* Desktop Menu */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
                {menuItems.map((item) => (
                  <AnimatedLink
                    key={item.name}
                    href={item.link}
                    variant="button"
                    color="text.primary"
                  >
                    {item.name}
                  </AnimatedLink>
                ))}
                {/* <LocaleSwitch /> */}
              </Box>

              <LanguageSelector />

              <IconButton
                aria-label="Open Navigation"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' }, ml: 1 }}
              >
                <MenuIcon color="secondary" fontSize="large" />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <NavigationDrawer
        menuItems={menuItems}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      />
    </nav>
  );
}
