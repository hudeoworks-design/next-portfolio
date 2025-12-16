import { useTranslations } from 'next-intl';
import { Typography, Container, Grid, Card } from '@mui/material';
import { ProjectData } from '@/components/pages/Portfolio';
import { Projects } from '@/components/pages/portfolio/projects';

export default function PortfolioPage() {
  const t = useTranslations('portfolio');

  const projectsData = t.raw('projects') as Array<ProjectData>;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom>{t('title')}</Typography>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Card>
            <Projects projectItems={projectsData} />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
