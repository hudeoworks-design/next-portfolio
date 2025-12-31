import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Grid from "@mui/material/Grid"; 
import PostCard from "./PostCard";
import { Container, Box, Typography } from "@mui/material";
import { Blog } from "@/types/blog";

// Update path to include 'blogs' folder
const blogsDirectory = path.join(process.cwd(), "content", "blogs");

// interface Blog {
//   slug: string;
//   title: string;
//   date: string;
//   featuredImage: string | { src: string; alt: string };
//   tags: string | string[];
//   description: string;
// }

interface SuggestedArticlesProps {
  currentTags: string[];
}

export default function SuggestedArticles({
  currentTags = [],
}: SuggestedArticlesProps) {
  // Check if directory exists to avoid build errors
  if (!fs.existsSync(blogsDirectory)) return null;

  const blogFolders = fs.readdirSync(blogsDirectory);

  const allBlogs = blogFolders
    .filter((folder) => !folder.includes(".")) // Only folders
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

  const suggestedBlogs = allBlogs
    .filter((blog) => {
      // Normalize tags to an array for comparison
      const blogTags = typeof blog.tags === "string" 
        ? blog.tags.split(",").map(t => t.trim()) 
        : blog.tags || [];
      
      return blogTags.some((tag) => currentTags.includes(tag));
    })
    // Don't suggest the current post (optional: requires passing current slug)
    .slice(0, 3);

  return (
    <Container
      sx={{
        px: { xs: 3, lg: 5 },
        py: { xs: 8, lg: 9 },
        maxWidth: { xs: "100%", sm: 554, lg: 1200 },
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "common.background",
      }}
    >
      <Box textAlign={{ xs: "left", lg: "center" }} mb={{ xs: 5, lg: 7 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontSize: "2.125rem", // Fixed invalid "8" font size
            color: "text.primary",
            fontWeight: 600,
          }}
        >
          Suggested Articles
        </Typography>
      </Box>
      <Grid
        container
        spacing={{ xs: 4, lg: 3 }} // Use spacing instead of gap for Grid
      >
        {suggestedBlogs.map((blog: Blog) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={blog.slug}>
            <PostCard
              title={blog.title}
              // FIX: Handle both string and object image formats
              image={
                typeof blog.featuredImage === "string"
                  ? { src: blog.featuredImage, alt: blog.title }
                  : blog.featuredImage
              }
              // Ensure tags is passed as array
              tags={typeof blog.tags === "string" ? blog.tags : (Array.isArray(blog.tags) ? blog.tags.join(", ") : "")}
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
