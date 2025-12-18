'use client';

import {
  Grid, // Ensure Grid2 is imported if using size prop
  Box,
  Card
} from '@mui/material';
import { AboutMe } from './about/aboutme';

export default function About() {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        py: 10,
        bgcolor: 'background.paper',
        color: 'text.primary'
      }}
    >
      <Grid container spacing={4}>
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

        </Card>
      </Grid>
    </Box>
  );
}
