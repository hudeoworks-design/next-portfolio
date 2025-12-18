import { useTranslations } from 'next-intl';
import { Container, Grid } from '@mui/material';
import { ProjectData } from '@/components/pages/Portfolio';
import { Projects } from '@/components/pages/portfolio/projects';

export default function PortfolioPage() {
  const t = useTranslations('portfolio');

  const projectsData = t.raw('projects') as Array<ProjectData>;

  return (
    <Container sx={{ py: 10 }}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Projects projectItems={projectsData} />
        </Grid>
      </Grid>
    </Container>
  );
}
