import { BlogPostPageProps } from "@/types/blog";
import { Container } from "@mui/material";

// 
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return(
    <Container sx={{ pt: 10 }}>
      {slug}
    </Container>
  )
}