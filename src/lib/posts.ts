// lib/posts.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Blog } from "@/types/blog";

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
