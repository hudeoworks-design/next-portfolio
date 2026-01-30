import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Typography, Box, Container, Link } from '@mui/material';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import matter from 'gray-matter';
import { mdxComponents } from '@/components/shared/ui/MdxComponents';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { category } = await searchParams;

  if (!category) return notFound();

  const filePath = path.join(process.cwd(), 'content/hobbies', slug, `${category}.mdx`);

  if (!fs.existsSync(filePath)) {
    return notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data: frontmatter } = matter(fileContent);

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="overline" color="text.secondary">
          <Link
            gutterBottom
            href={`/hobbies`}
            sx={{ display: 'inline-block' }}
            underline="hover"
          >
            Hobbies
          </Link>/<span>{slug}</span>
        </Typography>
        <Typography variant="h4" component="h1" fontWeight="600" mb={1}>
          {frontmatter.title}
        </Typography>
      </Box>
      {/* {frontmatter.videoID && <mdxComponents.YouTube id={frontmatter.videoID as string} />} */}
      <MDXRemote
        source={content}
        components={mdxComponents}
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
    </Container>
  );
}
