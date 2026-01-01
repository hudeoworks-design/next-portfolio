'use client'; // This component uses hooks and interactive elements

import { SetStateAction, useState } from 'react';
import { useTranslations } from 'next-intl'; // Import useTranslations hook
import {
  Box,
  Grid,
  Card,
  Pagination,
  Button,
} from '@mui/material/';
import { Projects } from './portfolio/projects';
import { DashboardTwoTone } from '@mui/icons-material';
import { ImageOverlayProps } from '../shared/ui/ImageOverlay';

// --- Define Interfaces for Type Safety (Corresponds to your data source from en.json) ---
export interface ProjectData {
  id: string;
  name: string;
  projectUrl: string;
  repoUrl: string;
  imgPath: string;
  imgAlt: string;
  summary: string; // The literal summary text is loaded here
  technologies: string[];
  keyFeatures: string[];
  links: ImageOverlayProps[];
}

// --- Component Definition ---
export default function Portfolio() {

  // Use the correct scope name, assuming "Portfolio" matches your JSON structure's root key
  const t = useTranslations('portfolio');

  // Use .raw() to pull the entire 'projects' array data structure from the JSON
  const projectsData = t.raw('projects') as Array<ProjectData>;

  // ... inside your component
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const paginatedItems = projectsData.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);


  const handleChangePage = (event: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  return (
    <Box
      component="section"
      id="portfolio"
    >
      <Card
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          p: 4,
          height: '100%',
          transition: 'background-color 0.3s'
        }}
      >
        <Button
          color="primary"
          endIcon={<DashboardTwoTone />}
          href="/portfolio"
          sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s', mb: 2 }}
          variant="outlined"
        >
          {t('title')}
        </Button>
        <Grid container spacing={4}>
          <Projects projectItems={paginatedItems} />
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={Math.ceil(projectsData.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                variant="outlined" shape="rounded"
              />
            </Box>
          </Grid>

        </Grid>

      </Card>
    </Box>
  );
}
