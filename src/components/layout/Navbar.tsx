'use client'; // Required for MUI hooks and interactivity in App Router

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Box,
} from '@mui/material/';
import {
  Menu as MenuIcon
} from '@mui/icons-material';

import Link from '../shared/Link';
import AnimatedLink from '../shared/ui/AnimatedLink';
import LanguageSelector from '../LanguageSelector';
import ThemeSwitcher from '../ThemeSwitcher';
import NavigationDrawer from './NavigationDrawer';
import { useNavigationLinks } from '@/lib/navUtils';


export default function ElevateAppBar() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const { menuItems, labels } = useNavigationLinks(true); // isHome: true

  return (
    <nav id="navbar">
      <AppBar elevation={0} color="inherit" sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h3"
              component={Link}
              href="/"
              color="primary"
              sx={{ flexGrow: 1, textDecoration: 'none', fontWeight: 'bold' }}
            >
              {labels.logo}
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
            </Box>

            <LanguageSelector />

            <ThemeSwitcher />

            <IconButton
              aria-label="Open Navigation"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, ml: 1 }}
            >
              <MenuIcon color="primary" fontSize="large" />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <NavigationDrawer
        menuItems={menuItems}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      />
    </nav>
  );
}
