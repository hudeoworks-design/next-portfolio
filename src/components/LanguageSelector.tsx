'use client';

import React from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { Button, FormControl, Menu, MenuItem } from '@mui/material';
import {
  Translate as TranslateIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';

const languages = [
  { code: 'ar', text: 'العربية' },
  { code: 'en', text: 'English' },
  { code: 'es', text: 'Español' },
  { code: 'ne', text: 'नेपाली' },
];

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname(); // Correct way to get current path in App Router
  const params = useParams(); // Correct way to get dynamic params like [lang]
  
  // Assumes your folder structure is app/[lang]/...
  const currentLocale = params.locale as string;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (nextLocale: string) => {
    setAnchorEl(null);
    
    if (!pathname) return;

    // Split the path and replace the locale segment (index 1)
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    const newPathname = segments.join('/');

    router.push(newPathname); // App Router push only accepts a string
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <FormControl sx={{ ml: 2, mr: { xs: 2, md: 0 } }}>
      <Button
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        aria-controls={anchorEl ? 'language-menu' : undefined}
        startIcon={<TranslateIcon />}
        endIcon={<KeyboardArrowDownIcon />}
        variant="outlined"
        onClick={handleButtonClick}
      >
         <span>{languages.find((lang) => lang.code === currentLocale)?.text || 'LANG'}</span>
      </Button>

      <Menu
        keepMounted
        PaperProps={{ style: { width: '144px' } }}
        anchorEl={anchorEl}
        id="language-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            selected={currentLocale === language.code}
            onClick={() => handleMenuItemClick(language.code)}
          >
            {language.text}
          </MenuItem>
        ))}
      </Menu>
    </FormControl>
  );
}
