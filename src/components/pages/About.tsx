'use client';

// components/AboutMeMui.tsx
import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { styled } from '@mui/material/styles';
import {
  Container,
  Divider,
  Typography,
  Grid, // Ensure Grid2 is imported if using size prop
  Box,
  Button,
  Card, Link, Avatar
} from '@mui/material';
import { Description } from '@mui/icons-material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import skillIcons from './constants/skillIcons';
import ProfessionalTimeline from "@/components/pages/home/Timeline";

// Assuming heroImage is correctly typed in your project
import heroImage from "../../../public/subash.jpeg";

const CustomDivider = styled(Divider)(({ theme }) => ({
  height: '4px',
  width: '60px',
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

export default function About() {
  const t = useTranslations('about');

  // To map over items in next-intl, we use t.raw() to get the array
  // const aboutItems = t.raw('aboutItems') as string[];

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
      <Container>
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography gutterBottom component="h2" variant="h3">
              {t('aboutTitle')}
            </Typography>
            <CustomDivider />
          </Grid>

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

            <Grid container spacing={4} justifyContent={'center'}>
              <Grid size={{ xs: 12, md: 9 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    fontSize: '3.5rem',
                    gap: 3,
                    justifyContent: {
                      xs: 'center',
                      md: 'flex-start',
                    },
                  }}
                >
                  {skillIcons.map((skillIcon) => (
                    <Box
                      key={skillIcon.label}
                      title={skillIcon.label}
                      sx={{
                        transition: 'transform 0.2s, color 0.2s',
                        '&:hover': {
                          color: 'primary.main',
                          transform: 'translateY(-5px)',
                        },
                      }}
                    >
                      {skillIcon.icon}
                    </Box>
                  ))}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 3 }} justifyContent={'flex-end'}>
                <Box p={1}>
                  <Button
                    color="primary"
                    endIcon={<Description />}
                    href={t('resume.resumeLink')} // Changed from property access to function call
                    rel="noopener noreferrer"
                    target="_blank"
                    sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
                    variant="outlined"
                  >
                    {t('resume.resumeButton')}
                  </Button>

                </Box>
                <SocialLinks />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Container>

      <ProfessionalTimeline />

    </Box>
  );
}

const AboutMeMui: React.FC = () => {
  // 'AboutMe' refers to a section in your translation file (e.g., en.json)
  const t = useTranslations('about.aboutItems');

  return (
    <Container disableGutters maxWidth={false}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={3}
        mt={4} // Equivalent to mt-8 in spacing scale
      >
        {/* Avatar and Image component handling */}
        <Box flexShrink={0}>
          <Avatar sx={{ width: 96, height: 96, ring: 2, borderColor: 'primary.main', ringOpacity: 0.2 }}>
            {/* Next/Image inside Avatar or a custom wrapper for better control */}
            <Image
              src={heroImage}
              alt={t('profileAltText')} // Localized alt text
              style={{ objectFit: 'cover' }}
              fill
              sizes='100%'
              priority
            />
          </Avatar>
        </Box>

        <Box flex={1} minWidth={0}>
          <Box display="flex" flexDirection="column" height="100%">
            {/* Profile Header */}
            <Box>
              <Typography variant="h4" component="h1" color="text.primary" mb={0.5}>
                {t('name')}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={3}>
                {t('handle')}
              </Typography>
            </Box>

            {/* About Me Section */}
            <Box
              flex={1}
              bgcolor="background.default" // Use default background for a slight contrast
              borderRadius={2}
              p={2} // Equivalent to p-4
              mb={4}
              mt={2} // Equivalent to mt-4
            >
              <Box display="flex" flexDirection="column" gap={1.5}>
                {/* Localized paragraphs */}
                <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
                  {t('aboutTitle')}
                </Typography>
                <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
                  {t('bioParagraph1')}
                </Typography>
                <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
                  {t('bioParagraph2')}
                </Typography>
                <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
                  {t('bioParagraph3')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

const SocialLinks: React.FC = () => {
  const t = useTranslations('about.socialLinks');
  return (
    <>
      <Box p={1}>
        <Button
          endIcon={<TwitterIcon />}
          href={t('twitter.url')}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          aria-label={t('twitter.ariaLabel')}
          sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
          variant="outlined"
        >
          {t('twitter.buttonText')}
        </Button>
      </Box>
      <Box p={1}>
        <Button
          endIcon={<GitHubIcon />}
          href={t('github.url')}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          aria-label={t('github.ariaLabel')}
          sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
          variant="outlined"
        >
          {t('github.buttonText')}
        </Button>
      </Box>
      <Box p={1}>
        <Button
          endIcon={<LinkedInIcon />}
          href={t('linkedin.url')}
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          aria-label={t('linkedin.ariaLabel')}
          sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
          variant="outlined"
        >
          {t('linkedin.buttonText')}
        </Button>
      </Box>
    </>
  );
}
