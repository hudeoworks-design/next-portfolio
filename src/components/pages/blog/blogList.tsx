'use client';
import { Key, SetStateAction, useState } from 'react';
import { Box, Grid, Card, Container, Stack, Chip, Pagination } from "@mui/material";
import Image from 'next/image'; // Use the modern Next Image component
import { getDataUrlWithShimmerEffect } from "@/lib/image-utils";
import Link from "@/components/shared/Link";
import PostCard from '@/components/PostCard';
import { Blog } from '@/app/types/blog';

export default function BlogsList({ paginatedBlogs }: any) {

    // ... inside your component
    // const [page, setPage] = useState(1);
    // const [rowsPerPage, setRowsPerPage] = useState(25);
    // const paginatedBlogs = allBlogs.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);

    // const handleChangePage = (event: any, newPage: SetStateAction<number>) => {
    //     setPage(newPage);
    // };

    return (
        // <Grid container spacing={4}>
        //     <Container disableGutters maxWidth={false}>
        //         <ul style={{ listStyleType: 'none', padding: 0 }}>
        //             {
        //                 paginatedBlogs.map((blog: any) => (
        //                     <li key={blog.slug}>
        //                         <Card
        //                             sx={{
        //                                 bgcolor: 'background.paper',
        //                                 borderRadius: 2,
        //                                 height: '100%',
        //                                 mb: 4,
        //                                 transition: 'background-color 0.3s'
        //                             }}
        //                         >
        //                             <Grid container spacing={2} size={12} p={2}>
        //                                 <Grid sx={{ xs: 12 }}>
        //                                     <Box sx={{ position: 'relative' }}>
        //                                         <Image
        //                                             alt={blog.title}
        //                                             placeholder="blur"
        //                                             blurDataURL={getDataUrlWithShimmerEffect(600, 370)}
        //                                             src={`${blog.imgPath}`}
        //                                             height={100}
        //                                             width={100}
        //                                             style={{ objectFit: 'cover' }}
        //                                         />
        //                                     </Box>
        //                                 </Grid>
        //                                 <Grid sx={{ xs: 12 }}>
        //                                     <Link href={`/blogs/${blog.slug}`}>
        //                                         <h2 style={{ margin: 0 }}>{blog.title}</h2>
        //                                     </Link>
        //                                     <p>{blog.description}</p>
        //                                     <p>By {blog.author}</p>
        //                                     <Stack direction="row" spacing={1}>
        //                                         {
        //                                             blog.tags.split(',').map((tag: string) => (
        //                                                 <Chip key={tag} label={tag} color="primary" variant="outlined" />
        //                                             ))
        //                                         }
        //                                     </Stack>
        //                                 </Grid>
        //                             </Grid>

        //                         </Card>
        //                     </li>
        //                 ))
        //             }
        //         </ul>
        //     </Container>

        //     <Grid size={{ xs: 12 }}>
        //         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        //             <Pagination
        //                 count={Math.ceil(allBlogs.length / rowsPerPage)}
        //                 page={page}
        //                 onChange={handleChangePage}
        //                 variant="outlined" shape="rounded"
        //             />
        //         </Box>
        //     </Grid>

        // </Grid>
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