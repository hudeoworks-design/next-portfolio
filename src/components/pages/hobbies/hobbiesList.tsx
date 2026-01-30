'use client';

import Image from 'next/image';
import { Grid, Box } from '@mui/material';
import { getDataUrlWithShimmerEffect } from '@/lib/image.utils';
import HobbyCategory, { HobbiesCategoryProps } from './hobbyCategories';

export default function HobbiesList({category}: HobbiesCategoryProps) {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 3 }}>
                <Box sx={{ position: 'relative', width: '100%', height: '150px' }}>
                    <Image
                        alt={category.img.alt}
                        src={category.img.src}
                        placeholder="blur"
                        blurDataURL={getDataUrlWithShimmerEffect(600, 370)}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={false}
                    />
                </Box>
            </Grid>

            <Grid size={{ xs: 9 }}>
                <HobbyCategory category={category} />
            </Grid>
        </Grid>

    );
}
