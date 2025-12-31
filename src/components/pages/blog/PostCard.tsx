"use client";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActions } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import { PostCardProps } from "@/types/blog";
import { getDataUrlWithShimmerEffect } from "@/lib/image-utils";
import { borderRadius } from "@/styles/themes/tokens";
import Tag from "./Tag";

const ImagePostLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  position: 'absolute',
  width: '100%',
  height: 112,
  paddingBottom: '61.67%',
  opacity: 0.25,
  display: "block", // Ensures the link wraps the image correctly
});

export default function PostCard({
  title,
  image,
  tags,
  description,
  link,
  maxWidth,
}: PostCardProps) {
  return (
    <Card
      elevation={0} // Usually looks better for blog grids
      sx={{
        maxWidth,
        backgroundImage: "none",
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ display: { xs: "none", lg: "block" }, position: 'relative' }}>
        <ImagePostLink href={`/blogs/${link.replace(/^\//, "")}`}>
          <Image
            // Safety check: Fallback to an empty string or placeholder if image is missing
            alt={typeof image === 'string' ? "Blog post cover" : image?.alt || "Blog post cover"}
            src={typeof image === 'string' ? image : image?.src || ""}
            placeholder="blur"
            blurDataURL={getDataUrlWithShimmerEffect(600, 370)}
            // Use sizes for performance so Next.js serves the right image size
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            style={{
              borderRadius: borderRadius?.medium || "8px",
              objectFit: "cover"
            }}
            // priority should be true only for the first 2-3 images on the page
            priority={false}
          />
        </ImagePostLink>
      </Box>

      <CardContent sx={{ pt: 3, px: 2, pb: 1, flexGrow: 1 }}>
        <Typography
          variant="h6" // Using variants is safer than raw numbers
          sx={{
            fontWeight: 600,
            lineHeight: 1.3,
            mb: 1,
            color: "text.primary",
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 0, pl: 2, pb: 2, flexWrap: "wrap", gap: 1, zIndex: 100 }}>
        {tags && tags.split(",").map((cat) => (
          <Tag
            size="small"
            label={cat}
            link={`/blogs?tag=${encodeURIComponent(cat.trim())}`}
            key={cat}
            bgColor="blogs.tagBgColor"
            selectedColor="blogs.tagSelectedColor"
          />
        ))}
      </CardActions>
    </Card>
  );
}
