import Image from 'next/image'; // Use the modern Next Image component
import { getDataUrlWithShimmerEffect } from "@/lib/image-utils";
import { Grid, Card, Box, CardContent, Typography, Chip } from "@mui/material";
import Link from '@/components/shared/Link';
import { ImageOverlay } from '@/components/shared/ui/ImageOverlay';
import { BlogProps, BlogData } from '@/lib/types/blog';

export const Blogs: React.FC<BlogProps> = ({ blogItems }) => {
  return (
    blogItems.map((blog: BlogData) => (
      <Grid key={blog.name} size={{ xs: 12, md: 4 }}>
        <Card>
          <Box sx={{ position: 'relative', width: '100%', height: 140, paddingBottom: '61.67%' }}>
            <Image
              alt={blog.imgAlt}
              placeholder="blur"
              blurDataURL={getDataUrlWithShimmerEffect(600, 370)}
              src={`/${blog.imgPath}`}
              fill
              style={{ objectFit: 'cover' }}
            />

            <ImageOverlay links={[{ type: "Read More", url: `/blogs${blog.blogLink}`, icon: "Visibility" }]} />
          </Box>
          <Box
            bgcolor="background.default"
            p={2}
          >
            <CardContent>

              <div>
                <Link
                  gutterBottom
                  href={`/blogs${blog.blogLink}`}
                  sx={{ display: 'inline-block' }}
                  underline="hover"
                  variant="h5"
                >
                  {blog.name}
                </Link>
                <Typography
                  color="textSecondary"
                  component="p"
                  variant="subtitle1"
                >
                  {blog.summary}
                </Typography>
              </div>

              <div>
                {
                  blog.tags.map((tech: string) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{ m: 0.5 }}
                      variant="outlined"
                    />
                  ))
                }
              </div>

            </CardContent>
          </Box>
        </Card>
      </Grid>
    ))
  );
}