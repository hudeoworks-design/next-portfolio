'use client';
import { Key } from 'react';
import { Grid, Container, } from "@mui/material";
import PostCard from './PostCard';
import { Blog } from '@/lib/types/blog';

export default function BlogsList({ paginatedBlogs }: any) {

  return (
    <Container sx={{ my: 6 }}>
      <Grid container rowGap={{ xs: 3, lg: 5 }}>
        {paginatedBlogs.map((blog: Blog, index: Key | null | undefined) => (
          <Grid size={{ xs: 12, lg: 4 }} key={index}>
            <PostCard
              title={blog.title}
              image={typeof blog.featuredImage === 'string' ? { src: blog.featuredImage, alt: blog.title } : { src: blog.featuredImage.src, alt: blog.featuredImage.alt }}
              tags={Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags}
              description={blog.description}
              link={blog.slug}
              maxWidth={{ xs: 554, lg: 355 }}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}