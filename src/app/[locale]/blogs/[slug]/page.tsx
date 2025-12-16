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
import { Box, Container } from "@mui/material";

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
        <Box sx={{ my: 2 }}>
          <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <p>{frontmatter.author}</p>
      <p>{frontmatter.description}</p>
      <p>{frontmatter.tags}</p>
      {/* Render TOC */}
      <ul>
        {headings?.map(({ text, slug, depth }) => (
          <li key={slug} style={{ marginLeft: `${depth - 1}rem` }}>
            <a href={`#${slug}`}>{text}</a>
          </li>
        ))}
      </ul>
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
      </Box>
    </Container>
  );
}
// Return all slugs for SSG
export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content/blogs");
  const slugs = readdirSync(blogDir);
  return slugs.map(slug => ({ slug }));
}