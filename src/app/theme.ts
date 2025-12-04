// app/theme.ts
'use client';
import { Roboto } from 'next/font/google';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { cyan, pink } from '@mui/material/colors';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = responsiveFontSizes(createTheme({
    palette: {
      mode: 'dark',
      primary: cyan,
      secondary: pink,
      error: {
        main: '#ff6358',
      },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    colorSchemes: { light: true, dark: true },
    cssVariables: {
        colorSchemeSelector: 'class'
    }
}));

export default theme;