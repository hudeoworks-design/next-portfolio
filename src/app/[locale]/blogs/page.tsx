import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Box, Grid, Container } from "@mui/material";
import BlogsList from "@/components/pages/blog/blogList";

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
            <BlogsList allBlogs={allBlogs} />
          </Box>
        </Grid>
      </Grid>
    </Container>

  );
}