'use client';

import { useTranslations } from 'next-intl';
import {
  Container,
  Grid,
  Box,
  Card,
  Typography
} from '@mui/material';
import ProfessionalTimeline from '@/components/pages/home/Timeline';
import { AboutMe } from '@/components/pages/about/aboutme';
import SkillSet from '@/components/shared/SkillSet';

export default function AboutPage() {
  const t = useTranslations('about');
  return (
    <Container sx={{ py: 3 }}>
      <Grid>
        <Grid size={12}>
          <Box
            component="section"
            id="about"
            sx={{
              color: 'text.primary'
            }}
          >
            <Grid container spacing={4}>
              {/* About Section */}
              <Card
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  px: 4,
                  height: '100%',
                  transition: 'background-color 0.3s'
                }}
              >
                <AboutMe />

                <Box>
                  <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, mt: 4, fontWeight: 700 }}>
                    {t('skillsTitle')}
                  </Typography>
                </Box>

                <SkillSet />

                <ProfessionalTimeline />

              </Card>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
