import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import Counter from "@/components/Counter";
import { Box, Card, Chip, Container, Grid, Stack } from "@mui/material";
import Image from 'next/image'; // Use the modern Next Image component
import { getDataUrlWithShimmerEffect } from "@/lib/image-utils";
import Link from '@/components/shared/Link';
import { List, ListItem } from '@mui/material';

const TableOfContents = ({ headings }: { headings: Heading[] }) => {
  return (
    <List component="nav" aria-label="table of contents">
      <ListItem
        disablePadding
        sx={{
          py: 0.5
        }}
      >
        <h3 style={{ margin: 0 }}>Table of Contents</h3>
      </ListItem>
      {headings?.map(({ text, slug, depth }) => (
        <ListItem
          key={slug}
          disablePadding
          sx={{
            // Use theme spacing for consistent 2025 design standards
            pl: (depth - 1) * 2,
            py: 0.5
          }}
        >
          <Link href={`#${slug}`} passHref legacyBehavior>
            {text}
          </Link>
        </ListItem>
      ))}
    </List>
  );
}


interface BlogPostPageProps {
  params: { slug: string };
}

interface Heading {
  depth: number;
  text: string;
  slug: string;
}

export async function extractHeadings(content: string): Promise<Heading[]> {
  const headings: Heading[] = [];
  const processor = unified().use(remarkParse).use(remarkMdx);
  const ast = processor.parse(content);

  visit(ast, "heading", (node: any) => {

    const text = node.children.map((child: any) => child.value).join("");
    headings.push({
      depth: node.depth,
      text,
      slug: text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""), // Convert to slug-friendly format. E.g. "My Heading" -> "my-heading"
    });
  });
  return headings;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const filePath = path.join(
    process.cwd(),
    "content",
    "blogs",
    slug,
    "page.mdx"
  );
  const fileContents = readFileSync(filePath, "utf8");

  const { content, data: frontmatter } = matter(fileContents);
  const headings = await extractHeadings(content);

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Box
            sx={{
              my: 10,
              bgcolor: 'background.paper',
              color: 'text.primary'
            }}
          >
            <Card
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                height: '100%',
                transition: 'background-color 0.3s'
              }}
            >
              <Grid container spacing={2} size={12}>
                <Grid sx={{ xs: 12, width: '100%' }}>
                  <Box sx={{ position: 'relative', width: '100%', height: 'auto' }}>
                    <Image
                      alt={frontmatter.title}
                      placeholder="blur"
                      blurDataURL={getDataUrlWithShimmerEffect(600, 370)}
                      src={`/blogs${frontmatter.imgPath}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    />
                  </Box>
                </Grid>

              </Grid>
              <Box sx={{ m: 4 }}>
                <Grid container spacing={2} size={12}>
                  <Grid sx={{ xs: 12, md: 8 }}>
                    <h2 style={{ margin: 0 }}>{frontmatter.title}</h2>
                    <p>{frontmatter.description}</p>
                    <p>By {frontmatter.author}, {frontmatter.date}</p>
                    <Stack direction="row" spacing={1}>
                      {
                        frontmatter.tags.split(',').map((tag: string) => (
                          <Chip key={tag} label={tag} color="primary" variant="outlined" />
                        ))
                      }
                    </Stack>

                    <MDXRemote
                      source={content}
                      components={{ Counter }} // or add more components here. E.g. { Counter, Alert, Tabs }
                      options={{
                        mdxOptions: {
                          rehypePlugins: [
                            rehypeSlug,
                            [
                              rehypePrettyCode,
                              {
                                theme: "github-dark", // or 'nord', 'dracula', etc.
                                keepBackground: true,
                              },
                            ],
                          ]
                        },
                        parseFrontmatter: true,
                      }}
                    />
                  </Grid>

                  <Grid sx={{ xs: 12, md: 4 }}>
                    <TableOfContents headings={headings} />
                  </Grid>

                </Grid>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>

  );
}
// Return all slugs for SSG
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content/blogs");
  const slugs = readdirSync(blogDir);
  return slugs.map(slug => ({ slug }));
}