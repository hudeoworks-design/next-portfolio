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
import { BookTwoTone } from '@mui/icons-material';
import { Blogs } from './blog/blogs';

// --- Define Interfaces for Type Safety (Corresponds to your data source from en.json) ---
export interface BlogData {
  id: string;
  name: string;
  blogLink: string;
  imgPath: string;
  imgAlt: string;
  summary: string; // The literal summary text is loaded here
  tags: string[];
}

// --- Component Definition ---
export default function Blog() {

  // Use the correct scope name, assuming "Portfolio" matches your JSON structure's root key
  const t = useTranslations('blog');

  // Use .raw() to pull the entire 'projects' array data structure from the JSON
  const blogsData = t.raw('blogs') as Array<BlogData>;

  // ... inside your component
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const paginatedItems = blogsData.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);


  const handleChangePage = (event: any, newPage: SetStateAction<number>) => {
    setPage(newPage);
  };

  return (
    <Box
      component="section"
      id="blogs"
      sx={{
        pt: 10,
        color: 'text.primary'
      }}
    >

      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>

          <Card
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 2,
              p: 4,
              height: '100%',
              transition: 'background-color 0.3s'
            }}
          >
            <Grid size={{ xs: 12 }} mb={4}>
              <Button
                color="primary"
                endIcon={<BookTwoTone />}
                href="/blogs"
                sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
                variant="outlined"
              >
                {t('title')}
              </Button>
            </Grid>
            
            <Grid container spacing={4}>

              <Blogs blogItems={paginatedItems} />

              <Grid size={{ xs: 12 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Pagination
                    count={Math.ceil(blogsData.length / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    variant="outlined" shape="rounded"
                  />
                </Box>
              </Grid>

            </Grid>

          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
