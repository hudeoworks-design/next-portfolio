import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
const blogsDirectory = path.join(process.cwd(), "content", "blogs");
export default function BlogsPage() {
  const blogFolders = fs.readdirSync(blogsDirectory);
  const allBlogs = blogFolders.map(folder => {
    const filePath = path.join(blogsDirectory, folder, "page.mdx");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontmatter } = matter(fileContent);
    return {
      slug: folder,
      ...frontmatter,
    };
  });
  return (
    <div>
      <h1>All Blog Posts</h1>
      <ul>
        {
        allBlogs.map((blog: any) => (
          <li key={blog.slug}>
            <Link href={`/blogs/${blog.slug}`}>
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
            </Link>
          </li>
        ))
        }
      </ul>
    </div>
  );
}