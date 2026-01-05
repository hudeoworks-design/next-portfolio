// lib/posts.js
import fs, { existsSync, readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";
import { Blog, BlogPostPageProps } from "@/lib/types/blog";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const postsDirectory = path.join(process.cwd(), "content", "blogs");

export function getAllPostsData() {
  // Get folder and file names under /content/blogs
  const postFolders = fs.existsSync(postsDirectory)
    ? fs.readdirSync(postsDirectory)
    : [];

  // list all blogs from all folders
  const allPostsData = postFolders
    .filter((folder) => !folder.includes(".")) // Filter out hidden files or page.tsx
    .map((folder) => {
      // Read mdx file as string
      const filePath = path.join(postsDirectory, folder, "page.mdx");
      if (!fs.existsSync(filePath)) return null;

      // Use gray-matter to parse the post metadata section
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data: frontmatter } = matter(fileContent);

      // Combine the data with the id/slug
      return {
        slug: folder,
        ...frontmatter,
      };
    })
    .filter(Boolean) as Blog[];

  return allPostsData;
}

export function getAllPostsBySelectedTag(
  allPostsData: Blog[],
  selectedTag: string
) {
  const filteredBlogs = (
    selectedTag
      ? allPostsData.filter((blog) => {
          const blogTags =
            typeof blog.tags === "string"
              ? blog.tags.split(",").map((t: string) => t.trim())
              : blog.tags || [];
          return blogTags.includes(selectedTag);
        })
      : allPostsData
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return [...new Set(filteredBlogs.flat())];
}

export function getAllTagsFromAllPosts(allPostsData: Blog[]) {
  return [
    ...new Set(
      allPostsData
        .map((blog) =>
          typeof blog.tags === "string"
            ? blog.tags.split(",").map((t) => t.trim())
            : blog.tags || []
        )
        .flat()
    ),
  ].sort();
}

export async function extractHeadings(content: string) {
  const headings: any[] = [];
  const processor = unified().use(remarkParse).use(remarkMdx);
  const ast = processor.parse(content);

  visit(ast, "heading", (node: any) => {
    const text = node.children
      .filter((c: any) => c.type === "text" || c.type === "inlineCode")
      .map((child: any) => child.value)
      .join("");

    headings.push({
      depth: node.depth,
      text,
      slug: text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
    });
  });

  return headings;
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content", "blogs");
  if (!existsSync(blogDir)) return [];
  const slugs = readdirSync(blogDir);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(
    process.cwd(),
    "content",
    "blogs",
    slug,
    "page.mdx"
  );

  if (!existsSync(filePath)) return { title: "Article Not Found" };

  const fileContents = readFileSync(filePath, "utf8");
  const { data: frontmatter } = matter(fileContents);

  // Safeguard: Extract image URL correctly whether it's a string or object
  const imageUrl =
    typeof frontmatter.featuredImage === "object"
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
    },
  };
}

export function getFileContents(slug: string[]) {
  const filePath = path.join(
    process.cwd(),
    ...slug
  );

  if (!existsSync(filePath)) {
    notFound();
  }

  const fileContents = readFileSync(filePath, "utf8");

  return matter(fileContents);
}

export function getTagsForPost(frontmatter: any) {
  const tagsArray =
    typeof frontmatter.tags === "string"
      ? frontmatter.tags.split(",").map((t: string) => t.trim())
      : frontmatter.tags || [];

  return tagsArray;
}

export function getTypedFormatterForPost(frontmatter: any) {

  // Ensure frontmatter is typed correctly for components
  const typedFrontmatter = {
    ...frontmatter,
    title: frontmatter.title || "Untitled",
    featuredImage: frontmatter.featuredImage || "/placeholder.jpg",
  } as any;

  return typedFrontmatter;
}
