// app/theme.ts
'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap'
});

const theme = createTheme({
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    colorSchemes: { light: true, dark: true },
    cssVariables: {
        colorSchemeSelector: 'class'
    }
});

export default theme;