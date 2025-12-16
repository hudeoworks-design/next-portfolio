'use client';

// components/AboutMeMui.tsx
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Container,
  Typography,
  Grid, // Ensure Grid2 is imported if using size prop
  Box,
  Button,
  Card, Avatar
} from '@mui/material';
import { Description } from '@mui/icons-material';

// Assuming heroImage is correctly typed in your project
import heroImage from "../../../public/subash.jpeg";
import { getLayoutDirection } from '@/lib/utils';
import { useParams } from 'next/navigation';
import SocialLinks from '../shared/SocialLinks';
import SkillSet from '../shared/SkillSet';

export default function About() {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        pb: 8,
        pt: 10,
        bgcolor: 'background.paper',
        color: 'text.primary'
      }}
    >
      {/* <Container> */}
        <Grid container spacing={4}>
          {/* About Section */}
          <Card
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 4,
              height: '100%',
              transition: 'background-color 0.3s'
            }}
          >
            <AboutMeMui />
          </Card>
        </Grid>
      {/* </Container> */}
    </Box>
  );
}

const AboutMeMui: React.FC = () => {
  const t = useTranslations('about');
  const params = useParams(); 
  const currentLocale = params.locale as string;

  return (
    <Container disableGutters maxWidth={false}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={3}
        mt={4} 
      >
        {/* Avatar and Image component handling */}
        <Box flexShrink={0}>
          <Avatar sx={{ width: 96, height: 96, ring: 2, borderColor: 'primary.main', ringOpacity: 0.2 }}>
            {/* Next/Image inside Avatar or a custom wrapper for better control */}
            <Image
              src={heroImage}
              alt={t('aboutItems.profileAltText')} // Localized alt text
              style={{ objectFit: 'cover' }}
              fill
              sizes='100%'
              priority
            />
          </Avatar>

          <Box mt={5} display="flex" flexDirection="column" textAlign={'left'} gap={1}>
            <SocialLinks direction={getLayoutDirection(currentLocale)} />
            <Box pb={1}
              dir={getLayoutDirection(currentLocale)}>
              <Button
                color="primary"
                endIcon={<Description />}
                href={t('resume.resumeLink')} 
                rel="noopener noreferrer"
                target="_blank"
                sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s', width: "100%" }}
                variant="outlined"
              >
                {t('resume.resumeButton')}
              </Button>

            </Box>
          </Box>
        </Box>

        <Box flex={1} minWidth={0}>
          <Box display="flex" flexDirection="column" height="100%">
            {/* Profile Header */}
            <Box>
              <Typography variant="h4" component="h1" color="text.primary" mb={0.5}>
                {t('aboutItems.name')}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={3}>
                {t('aboutItems.handle')}
              </Typography>
            </Box>

            {/* About Me Section */}
            <Box
              flex={1}
              bgcolor="background.default"
              borderRadius={2}
              p={2}
              mb={4}
              mt={2}
            >
              <Box display="flex" flexDirection="column" gap={1.5}>
                
                <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
                  {t('aboutItems.bioParagraph1')}
                </Typography>
                <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
                  {t('aboutItems.bioParagraph2')}
                </Typography>
                <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
                  {t('aboutItems.bioParagraph3')}
                </Typography>
              </Box>
            </Box>

            {/* Skills Section */}
            <Box
              flex={1}
              bgcolor="background.default"
              borderRadius={2}
              p={2}
              mb={4}
              mt={2}
            >
              <Box display="flex" flexDirection="column" gap={1.5}>
                <SkillSet />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
