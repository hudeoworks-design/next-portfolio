import { readFileSync, readdirSync, existsSync } from "fs";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { BlogContent, FeaturedImage } from "../components";
import { Metadata } from "next";
import EmailSubscription from "@/components/EmailSubscription";
import SuggestedArticles from "@/components/pages/blog/SuggestedArticles";
import TableOfContents from "@/components/pages/blog/TableOfContents";
import Counter from "../components/tutorials/Counter";
import { notFound } from "next/navigation";
import Tag from "@/components/pages/blog/Tag";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Next.js 15 ISR Config
export const revalidate = 60; 
export const dynamicParams = true; 
export const dynamic = "force-static"; // Forces static generation and avoids DYNAMIC_SERVER_USAGE

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Await params for Next.js 15
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "content", "blogs", slug, "page.mdx");

  if (!existsSync(filePath)) {
    notFound();
  }

  const fileContents = readFileSync(filePath, "utf8");
  const { content, data: frontmatter } = matter(fileContents);
  const headings = await extractHeadings(content);

  const tagsArray = typeof frontmatter.tags === 'string'
    ? frontmatter.tags.split(",").map((t: string) => t.trim())
    : (frontmatter.tags || []);

  const typedFrontmatter = {
    ...frontmatter,
    title: frontmatter.title || "Untitled",
    featuredImage: frontmatter.featuredImage || "/placeholder.jpg",
  } as any;

  return (
    <>
      <Box sx={{ backgroundColor: 'background.paper', py: 12, position: "relative" }}>
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="h4" component="h1" fontWeight="600" mb={1}>
                {typedFrontmatter.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={1}>
                {frontmatter.description}
              </Typography>
              <Stack direction="row" gap={1} flexWrap="wrap" mt={2}>
                {tagsArray.map((tag: string) => (
                  <Tag key={tag} label={tag} link={`/blogs?tag=${tag}`} />
                ))}
              </Stack>
            </Grid>
            <Grid size={6}>
              <FeaturedImage frontmatter={typedFrontmatter} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container sx={{ py: 2 }}>
        <Stack gap={7} direction={{ xs: "column", lg: "row" }}>
          <Box sx={{ width: { lg: "250px" }, position: 'sticky', top: 100, height: 'fit-content' }}>
            <TableOfContents headings={headings} />
          </Box>
          <Box sx={{ flexGrow: 1, width: '100%', maxWidth: '800px' }}>
            <BlogContent
              mdxContent={
                <MDXRemote
                  source={content}
                  components={{ Counter }}
                  options={{
                    mdxOptions: {
                      rehypePlugins: [
                        rehypeSlug,
                        [rehypePrettyCode, { theme: "github-dark" }],
                      ],
                    },
                    parseFrontmatter: true,
                  }}
                />
              }
            />
          </Box>
        </Stack>
      </Container>
      
      <SuggestedArticles currentTags={tagsArray} />
      <EmailSubscription />
    </>
  );
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content", "blogs");
  if (!existsSync(blogDir)) return [];
  
  // Only return directories (slugs)
  const slugs = readdirSync(blogDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({ slug: dirent.name }));
    
  return slugs;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  // CRITICAL FIX: Await params here to avoid DYNAMIC_SERVER_USAGE error
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content", "blogs", slug, "page.mdx");

  if (!existsSync(filePath)) return { title: "Article Not Found" };

  const fileContents = readFileSync(filePath, "utf8");
  const { data: frontmatter } = matter(fileContents);

  const imageUrl = typeof frontmatter.featuredImage === 'object'
    ? frontmatter.featuredImage.src
    : frontmatter.featuredImage;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      images: [{ url: imageUrl || "/placeholder.jpg" }],
    },
  };
}

async function extractHeadings(content: string) {
  const headings: any[] = [];
  try {
    const processor = unified().use(remarkParse).use(remarkMdx);
    const ast = processor.parse(content);

    visit(ast, "heading", (node: any) => {
      const text = node.children
        .filter((c: any) => c.type === 'text' || c.type === 'inlineCode')
        .map((child: any) => child.value)
        .join("");

      headings.push({
        depth: node.depth,
        text,
        slug: text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""),
      });
    });
  } catch (e) {
    console.error("Heading parsing error:", e);
  }
  return headings;
}
