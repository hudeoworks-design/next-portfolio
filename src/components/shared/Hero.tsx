import React from "react";
import { Box, Container, Button, Typography, Grid } from '@mui/material/';

interface HeroProps {
    title: string;
    subtitle?: string;
    backgroundImageUrl?: string;
    children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
    title,
    subtitle,
    backgroundImageUrl,
    children,
}) => {
    return (
        <Box component="section" id="home">
            <Container 
                sx={{ 
                    minHeight: {
                        xs: '100vh',
                        lg: '95vh',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundImage: {
                        lg: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
                        xs: 'none'
                    },
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right -2rem bottom',
                    backgroundSize: '60%'
                }}>
                {title && (
                    <Box sx={{ mb: 7 }}>
                        <Typography variant="h5" component="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                    </Box>
                )}
                {subtitle && (
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
                        {subtitle}
                    </Typography>
                )}
                {children}
            </Container>
        </Box>
    );
};

export default Hero;