"use client";

import { ReactNode, useMemo, useState, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';

import { getLayoutDirection } from '@/lib/utils';
import { createAppTheme } from '@/styles/theme';

interface ProviderProps {
    children: ReactNode;
    locale: string;
    messages: Record<string, any>;
}

function MUIThemeProvider({ children, locale }: { children: ReactNode; locale: string }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const direction = useMemo(() => getLayoutDirection(locale) as 'rtl' | 'ltr', [locale]);

    const theme = useMemo(() => {
        const mode = resolvedTheme === "dark" ? "dark" : "light";
        return createAppTheme(mode, direction);
    }, [resolvedTheme, direction]);

    // Render children with visibility hidden during hydration to prevent style flash
    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            {/* Critical: ensures CSS logic like 'left' vs 'right' works for MUI components */}
            <div dir={direction} style={{ display: 'contents' }}>
                <CssBaseline />
                {children}
            </div>
        </ThemeProvider>
    );
}

export function CustomThemeProvider({ children, locale, messages }: ProviderProps) {
    const direction = useMemo(() => getLayoutDirection(locale), [locale]);

    useEffect(() => {
        document.documentElement.dir = direction;
        document.documentElement.lang = locale;
    }, [direction, locale]);

    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone="America/New_York"
        >
            {/* 
                FIX: Adding 'key={locale}' ensures the Cache Provider reloads 
                the Stylis plugins when switching between RTL/LTR locales.
            */}
            <AppRouterCacheProvider
                key={locale} 
                options={{
                    key: direction === 'rtl' ? 'muirtl' : 'mui',
                    stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : [],
                }}
            >
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <MUIThemeProvider locale={locale}>
                        {children}
                    </MUIThemeProvider>
                </NextThemesProvider>
            </AppRouterCacheProvider>
        </NextIntlClientProvider>
    );
}
