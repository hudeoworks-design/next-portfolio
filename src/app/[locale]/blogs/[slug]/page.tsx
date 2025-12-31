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
import Footer from "@/components/layout/Footer";
import SuggestedArticles from "@/components/pages/blog/SuggestedArticles";
import TableOfContents from "@/components/pages/blog/TableOfContents";
import Counter from "../components/tutorials/Counter";
import { notFound } from "next/navigation";
import Tag from "@/components/pages/blog/Tag";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Set the revalidation interval (e.g., 60 seconds)
export const revalidate = 60; 
// Control behavior for paths NOT returned by generateStaticParams
// true (default): generate on-demand (ISR)
// false: return 404 for unknown paths
export const dynamicParams = true; 

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

  // Normalize tags: handle string "js, react" or array ["js", "react"]
  const tagsArray = typeof frontmatter.tags === 'string'
    ? frontmatter.tags.split(",").map((t: string) => t.trim())
    : (frontmatter.tags || []);

  // Ensure frontmatter is typed correctly for components
  const typedFrontmatter = {
    ...frontmatter,
    title: frontmatter.title || "Untitled",
    featuredImage: frontmatter.featuredImage || "/placeholder.jpg",
  } as any;

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          py: 12,
          position: "relative",
          ":after": {
            content: `""`,
            position: "absolute",
            left: 0, right: 0, bottom: 0,
            height: { xs: "15%", md: "33%" },
            backgroundColor: 'background.paper',
            zIndex: 1,
          },
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="h4" component="h1" color="text.primary" fontWeight="600" mb={1}>
                {typedFrontmatter.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" maxWidth={600} mb={1}>
                {frontmatter.description}
              </Typography>
              <Stack mb={5} gap={2}>
                <Typography variant="body2" color="text.secondary">
                  Last Updated: {frontmatter.date}
                </Typography>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {tagsArray.map((tag: string) => (
                    <Tag
                      key={tag}
                      size="small"
                      label={tag}
                      link={`/blogs?tag=${tag}`}
                      bgColor="blogs.tagBgColor"
                      selectedColor="blogs.tagSelectedColor"
                    />
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid size={6}>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <FeaturedImage frontmatter={typedFrontmatter} />
              </Box>
            </Grid>
          </Grid>


        </Container>
      </Box>

      <Container sx={{ py: 2 }}>
        <Stack gap={7} direction={{ xs: "column", lg: "row" }}>
          <Box sx={{
            display: { xs: "none", lg: "block" },
            width: { lg: "250px" },
            position: 'sticky',
            top: 100,
            height: 'fit-content'
          }}>
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
                        [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
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
      <Footer />
    </>
  );
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content", "blogs");
  if (!existsSync(blogDir)) return [];
  
  const slugs = readdirSync(blogDir);
  return slugs.map((slug) => ({ 
    slug: slug.replace(/\.mdx?$/, "") // Ensure you strip extensions if necessary
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content", "blogs", slug, "page.mdx");

  if (!existsSync(filePath)) return { title: "Article Not Found" };

  const fileContents = readFileSync(filePath, "utf8");
  const { data: frontmatter } = matter(fileContents);

  // Safeguard: Extract image URL correctly whether it's a string or object
  const imageUrl = typeof frontmatter.featuredImage === 'object'
    ? frontmatter.featuredImage.src
    : frontmatter.featuredImage;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: [{ url: imageUrl, alt: frontmatter.title }],
    },
    twitter: {
      card: "summary_large_image",
      images: [imageUrl],
    }
  };
}

async function extractHeadings(content: string) {
  const headings: any[] = [];
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

  return headings;
}
