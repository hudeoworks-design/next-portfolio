import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid"; 
import { SearchContainer } from "./components";
import { Blog } from "@/types/blog";
import { getAllPostsBySelectedTag, getAllPostsData, getAllTagsFromAllPosts } from "@/lib/posts";
import Tag from "@/components/pages/blog/Tag";
import PostCard from "@/components/pages/blog/PostCard";

export default async function BlogsPage({ 
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }> | { tag?: string };
}) {
  const params = await searchParams;
  const selectedTag = params.tag || "";

  // list all blogs from all folders
  const allBlogs = getAllPostsData();
  // filtered blogs by tags
  const filteredBlogs = getAllPostsBySelectedTag(allBlogs, selectedTag);
  // list all tags from entire blog
  const allTags = getAllTagsFromAllPosts(allBlogs);

  // tag click event
  const handleTagClick = (tag: string) => {
    return tag === selectedTag ? "/blogs" : `/blogs?tag=${tag}`;
  };

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
