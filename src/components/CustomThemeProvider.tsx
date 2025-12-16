"use client";

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, ReactNode, useState, useEffect } from 'react';
import { getLayoutDirection } from '@/lib/utils';
import { useParams } from 'next/navigation';

import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';


// Define a helper function to create the correct emotion cache
const createEmotionCache = (direction: 'rtl' | 'ltr') => {
    if (direction === 'rtl') {
        return createCache({
            key: 'muirtl',
            stylisPlugins: [prefixer, rtlPlugin],
        });
    }
    return createCache({
        key: 'mui',
        // No rtlPlugin needed for ltr
    });
};


function MUIThemeProvider({ children }: { children: React.ReactNode }) {
    const params = useParams();
    // Safely retrieve the locale, defaulting to 'en' or your default locale if undefined
    const locale = params.locale ? String(params.locale) : 'en'; 

    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Determine the layout direction immediately based on the locale from params
    const direction = useMemo(() => getLayoutDirection(locale) as 'rtl' | 'ltr', [locale]);

    // Use a single emotion cache based on the determined direction
    const emotionCache = useMemo(() => createEmotionCache(direction), [direction]);


    // Avoid hydration mismatch by waiting for mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const theme = useMemo(() =>
        createTheme({
            // Set the MUI theme direction property
            direction: direction, 
            palette: {
                // Ensure a valid mode is set (light/dark)
                mode: resolvedTheme === "dark" ? "dark" : "light",
            },
        }), [resolvedTheme, direction]);

    if (!mounted) {
        // Prevent flash of wrong theme by returning null or a placeholder
        // Setting 'visibility: hidden' works well if you need space reserved
        return <div style={{ visibility: "hidden" }}>{children}</div>;
    }

    // Crucially, wrap with CacheProvider using the correct cache instance
    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}

// Keep the main wrapper component the same
export function CustomThemeProvider({
    children,
    locale,
    messages
}: {
    children: ReactNode;
    locale: string;
    
    messages: Record<string, any>;
}) {
    // You must also set the 'dir' attribute on the document root manually for native elements
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('dir', getLayoutDirection(locale));
        }
    }, [locale]);

    const timeZone = 'America/New_York';
    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
            <AppRouterCacheProvider>
                <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                    <MUIThemeProvider>{children}</MUIThemeProvider>
                </NextThemesProvider>
            </AppRouterCacheProvider>
        </NextIntlClientProvider>
    );
}
