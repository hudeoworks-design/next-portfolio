'use client';

import Image from 'next/image'; // Fixes "Image cannot be used as JSX"
import { Grid, Box, Container, CardContent, Card, Typography } from '@mui/material';
import { getDataUrlWithShimmerEffect } from '@/lib/image.utils';
import HobbyCategory, { HobbiesCategoryProps } from './hobbyCategories';

export default function HobbiesList({category}: HobbiesCategoryProps) {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 3 }}>
                {/* Box must have height and relative position */}
                <Box sx={{ position: 'relative', width: '100%', height: '150px' }}>
                    <Image
                        alt={category.img.alt}
                        src={category.img.src}
                        placeholder="blur"
                        blurDataURL={getDataUrlWithShimmerEffect(600, 370)}
                        fill
                        style={{ objectFit: 'cover' }} // Prevents image stretching
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
