import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Box, Grid, Card, Container, Stack, Chip } from "@mui/material";
import Image from 'next/image'; // Use the modern Next Image component
import { getDataUrlWithShimmerEffect } from "@/lib/image-utils";
import Link from "@/components/shared/Link";

const blogsDirectory = path.join(process.cwd(), "content", "blogs");

export default function BlogsPage() {
  const blogFolders = fs.readdirSync(blogsDirectory);

  const allBlogs = blogFolders.map(folder => {
    const filePath = path.join(blogsDirectory, folder, "page.mdx");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter } = matter(fileContent);
    return {
      slug: folder,
      ...frontmatter,
    };
  });

  return (
    <Container>
      <Grid>
        <Grid size={12}>
          <Box
            component="section"
            id="about"
            sx={{
              pt: 10,
              bgcolor: 'background.paper',
              color: 'text.primary'
            }}
          >
            <Grid container spacing={4}>
              <Container disableGutters maxWidth={false}>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  {
                    allBlogs.map((blog: any) => (
                      <li key={blog.slug}>
                        <Card
                          sx={{
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            height: '100%',
                            mb: 4,
                            transition: 'background-color 0.3s'
                          }}
                        >
                          <Grid container spacing={2} size={12} p={2}>
                            <Grid sx={{ xs: 12 }}>
                              <Box sx={{ position: 'relative' }}>
                                <Image
                                  alt={blog.title}
                                  placeholder="blur"
                                  blurDataURL={getDataUrlWithShimmerEffect(600, 370)}
                                  src={`/blogs${blog.imgPath}`}
                                  height={100}
                                  width={100}
                                  style={{ objectFit: 'cover' }}
                                />
                              </Box>
                            </Grid>
                            <Grid sx={{ xs: 12 }}>
                              <Link href={`/blogs/${blog.slug}`}>
                                <h2 style={{ margin: 0 }}>{blog.title}</h2>
                              </Link>
                              <p>{blog.description}</p>
                              <p>By {blog.author}</p>
                              <Stack direction="row" spacing={1}>                              
                              {
                                blog.tags.split(',').map((tag: string) => (
                                  <Chip key={tag} label={tag} color="primary" variant="outlined" />
                                ))
                              }
                              </Stack>
                            </Grid>
                          </Grid>

                        </Card>
                      </li>
                    ))
                  }
                </ul>
              </Container>

            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>

  );
}