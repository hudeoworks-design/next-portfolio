import { Card, Box, CardContent, Container, Grid, Typography, List, ListItem, ListItemIcon } from "@mui/material";

import { getTranslations } from "next-intl/server"; 
import CategoryDropdown from "@/components/pages/hobbies/CategoryDropdown";
import { Suspense } from "react";

interface HobbyCategory {
    type: string;
    fields: string[];
}

export default async function HobbiesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
    const resolvedParams = await searchParams;
    const type = resolvedParams.type;

    const t = await getTranslations('about');
    const hobbies = t.raw('aboutme.hobbies.categories') as Array<HobbyCategory>;

    const filteredHobbies: HobbyCategory[] = (() => {
        if (type) {
            const found = hobbies.find(h => h.type.toLowerCase() === type.toLowerCase());
            return found ? [found] : [];
        }
        return hobbies;
    })();

    return (
        <Container sx={{ py: 3 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 3, mt: 4, fontWeight: 700 }}>
                {t('aboutme.hobbies.title')}
            </Typography>
            
            <Grid container spacing={3}>
                <Suspense fallback={<div>Loading filters...</div>}>
                    {filteredHobbies.map((hobby) => (
                        <Grid size={{ xs: 12, lg: 4 }} key={hobby.type}>
                            <CategoryDropdown currentCategory={hobby} />
                        </Grid>
                    ))}
                </Suspense>
            </Grid>
        </Container>
    );
}