'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import {
  Typography,
  Box,
  Paper,
  Chip,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';


import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';

interface TimelineData {
  key: string;
  skills: string[];
  icon: React.ReactNode;
}

const experienceData: TimelineData[] = [
  { key: 'caci', icon: <BusinessIcon />, skills: ['Angular', 'Java Spring', 'Kubernetes', 'ArcGIS'] },
  { key: 'travelers', icon: <BusinessIcon />, skills: ['React', 'StencilJS', 'AWS', 'Terraform'] }
];

const educationData: TimelineData[] = [
  { key: 'mba', icon: <SchoolIcon />, skills: ['Business Strategy', 'Leadership'] },
  { key: 'bca', icon: <SchoolIcon />, skills: ['Computer Science', 'Networking'] }
];

const ProfessionalTimeline: React.FC = () => {
  const t = useTranslations('Timeline');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const renderTimelineSection = (title: string, data: TimelineData[]) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        {title}
      </Typography>

      <Timeline position={isMobile ? 'right' : 'alternate'}>
        {data.map((item) => (
          <TimelineItem key={item.key}>
            {!isMobile && (
              <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
                {t(`items.${item.key}.date`)}
              </TimelineOppositeContent>
            )}
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot color="primary" variant="outlined">
                {item.icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" component="span" fontWeight="bold">
                  {t(`items.${item.key}.title`)}
                </Typography>
                <Typography color="text.secondary">{t(`items.${item.key}.org`)}</Typography>
                {isMobile && (
                  <Typography variant="caption" display="block" color="primary">
                    {t(`items.${item.key}.date`)}
                  </Typography>
                )}
                <Typography sx={{ mt: 1, mb: 2 }}>
                  {t(`items.${item.key}.desc`)}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {item.skills.map((skill) => (
                    <Chip key={skill} label={skill} size="small" variant="outlined" />
                  ))}
                </Box>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ mb: 6, fontWeight: 800 }}>
        {t('title')}
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          {renderTimelineSection(t('experience'), experienceData)}
        </Grid>
        <Grid size={{ xs: 12 }}>
          {renderTimelineSection(t('education'), educationData)}
        </Grid>
      </Grid>

    </Box>
  );
};

export default ProfessionalTimeline;
