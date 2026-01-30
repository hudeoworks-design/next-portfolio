import { Box, Container, Typography, Grid } from "@mui/material";
import { Blog } from "@/lib/types/blog";
import { getAllPostsBySelectedTag, getAllPostsData, getAllTagsFromAllPosts } from "@/lib/posts";
import PostCard from "@/components/pages/blog/PostCard";
import SearchContainer from "@/components/shared/ui/SearchContainer";

export default async function PoemsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const selectedTag = tag || "";

  const allBlogs = getAllPostsData("content", "poems");
  const allTags = getAllTagsFromAllPosts(allBlogs);
  const filteredBlogs = getAllPostsBySelectedTag(allBlogs, selectedTag);

  return (
    <Container>
      <Grid container>
        <Grid size={12}>
          <Box sx={{ pt: 10 }}>
            <Container>
              <Typography variant="h5" component="h1" sx={{ mb: 3, px: 3 }}>
                Filter by tags:
              </Typography>

              <SearchContainer activeTag={selectedTag} tags={allTags} />

            </Container>

            <Container sx={{ my: 6 }}>
              <Grid container spacing={{ xs: 3, lg: 5 }}>
                {filteredBlogs.map((blog: Blog) => {
                  const imageProp = typeof blog.featuredImage === "string"
                    ? { src: blog.featuredImage, alt: blog.title }
                    : blog.featuredImage;

                  const tagsArray = typeof blog.tags === "string"
                    ? blog.tags.split(",").map((t: string) => t.trim())
                    : blog.tags || [];
                  const tagsString = tagsArray.join(", ");

                  return (
                    <Grid size={{ xs: 12, lg: 4 }} key={blog.slug}>
                      <PostCard
                        contentDirectory="hobbies"
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
