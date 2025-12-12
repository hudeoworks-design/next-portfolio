"use client";
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMemo, ReactNode, useState, useEffect } from 'react';

function MUIThemeProvider({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch by waiting for mount
    useEffect(() => {
        setMounted(true);
    }, []);

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode: resolvedTheme === "dark" ? "dark" : "light",
            },
        }), [resolvedTheme]);

    if (!mounted) {
        // Prevent flash of wrong theme by returning null or a placeholder
        return <div style={{ visibility: "hidden" }}>{children}</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}

export function CustomThemeProvider({
    children,
    locale,
    messages
}: {
    children: ReactNode;
    locale: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: Record<string, any>;
}) {
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <AppRouterCacheProvider>
                <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                    <MUIThemeProvider>{children}</MUIThemeProvider>
                </NextThemesProvider>
            </AppRouterCacheProvider>
        </NextIntlClientProvider>
    );
}
