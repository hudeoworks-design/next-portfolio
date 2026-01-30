import { Card, Box, CardContent, Container, Typography } from "@mui/material";

import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import HobbiesList from "@/components/pages/hobbies/hobbiesList";
import { HobbiesProps } from "@/components/pages/hobbies/hobbyCategories";

export default async function HobbiesPage({
    searchParams,
}: {
    searchParams: Promise<{ type: string, fields: string[], img: {} }>;
}) {
    const resolvedParams = await searchParams;
    const type = resolvedParams.type;

    const t = await getTranslations('about');
    const hobbies = t.raw('aboutme.hobbies.categories') as Array<HobbiesProps>;

    const filteredHobbies: HobbiesProps[] = (() => {
        if (type) {
            const found = hobbies.find(h => h.type.toLowerCase() === type.toLowerCase());
            return found ? [found] : [];
        }
        return hobbies;
    })();

    return (
        <Container sx={{ py: 3, gap: 1 }}>
            <Typography variant="h3" align="center" gutterBottom sx={{ mb: 3, mt: 4, fontWeight: 700 }}>
                {t('aboutme.hobbies.title')}
            </Typography>
            
            {filteredHobbies.map((hobby) => (
                <Suspense key={hobby.type} fallback={<div>Loading {`${hobby.type}`}...</div>}>
                    <Box>
                        <Typography variant="h5" align="left" gutterBottom sx={{ mb: 3, mt: 4, fontWeight: 700 }}>
                            {hobby.type.toLocaleUpperCase()}
                        </Typography>
                    </Box>
                    <Card key={hobby.type}>

                        <CardContent>
                            <HobbiesList category={hobby} />
                        </CardContent>
                    </Card>
                </Suspense>
            ))}
            
        </Container>
    );
}