import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Box, Container, Stack, Typography } from "@mui/material";
// FIX 1: Import Grid2 (aliased as Grid) to support the 'size' prop
import Grid from "@mui/material/Grid"; 
import Tag from "@/components/Tag";
import { SearchContainer } from "./components";
import PostCard from "@/components/PostCard";
import { Blog } from "@/app/types/blog";

const blogsDirectory = path.join(process.cwd(), "content", "blogs");

export default async function BlogsPage({ 
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }> | { tag?: string };
}) {
  const params = await searchParams;
  const selectedTag = params.tag || "";

  const blogFolders = fs.existsSync(blogsDirectory) ? fs.readdirSync(blogsDirectory) : [];

  const allBlogs = blogFolders
    .filter((folder) => !folder.includes(".")) // Filter out hidden files or page.tsx
    .map((folder) => {
      const filePath = path.join(blogsDirectory, folder, "page.mdx");
      if (!fs.existsSync(filePath)) return null;

      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data: frontmatter } = matter(fileContent);

      return {
        slug: folder,
        ...frontmatter,
      };
    })
    .filter(Boolean) as Blog[];

  const allTags = ["javascript", "css", "react", "scope", "variable", "loop", "context", "hook", "border", "display", "spacing"];

  const handleTagClick = (tag: string) => {
    return tag === selectedTag ? "/blogs" : `/blogs?tag=${tag}`;
  };

  const filteredBlogs = selectedTag
    ? allBlogs.filter((blog) => {
        const blogTags = typeof blog.tags === "string" 
          ? blog.tags.split(",").map(t => t.trim()) 
          : blog.tags || [];
        return blogTags.includes(selectedTag);
      })
    : allBlogs;

  filteredBlogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Container>
      {/* Grid container here refers to Grid2 */}
      <Grid container>
        <Grid size={12}>
          <Box
            sx={{ pt: 10, bgcolor: 'background.paper', color: 'text.primary' }}
          >
            <SearchContainer>
              <Container>
                <Typography variant="h5" component="h1" sx={{ mb: 5, px: 3 }}>
                  Search by topic:
                </Typography>
                <Stack gap={3} direction="row" px={3} flexWrap="wrap">
                  {allTags.map((tag) => (
                    <Tag
                      label={tag}
                      link={handleTagClick(tag)}
                      key={tag}
                      size="large"
                      selected={tag === selectedTag}
                      bgColor="blogs.tagBgColor"
                      selectedColor="blogs.tagSelectedColor"
                    />
                  ))}
                </Stack>
              </Container>
            </SearchContainer>
      
            <Container sx={{ my: 6 }}>
              <Grid container spacing={{ xs: 3, lg: 5 }}>
                {filteredBlogs.map((blog: Blog) => {
                  // FIX 2: Normalize Image
                  const imageProp = typeof blog.featuredImage === "string" 
                    ? { src: blog.featuredImage, alt: blog.title }
                    : blog.featuredImage;

                  // FIX 3: Normalize Tags for PostCard
                  const tagsArray = typeof blog.tags === "string" 
                    ? blog.tags.split(",").map(t => t.trim()) 
                    : blog.tags || [];
                  const tagsString = tagsArray.join(", ");

                  return (
                    <Grid size={{ xs: 12, lg: 4 }} key={blog.slug}>
                      <PostCard
                        title={blog.title}
                        image={imageProp}
                        tags={tagsString}
                        description={blog.description}
                        link={blog.slug} 
                        maxWidth={{ xs: 554, lg: 355 }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
