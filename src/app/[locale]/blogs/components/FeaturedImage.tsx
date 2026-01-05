"use client";

import { FeaturedImageProps } from "@/lib/types/blog";
import { borderRadius } from "@/styles/themes/tokens";
import { Box } from "@mui/material";
import Image from "next/image";

export default function FeaturedImage({ frontmatter }: FeaturedImageProps) {
  // Normalize the image source and alt text
  const imageSrc = typeof frontmatter.featuredImage === 'string'
    ? frontmatter.featuredImage
    : frontmatter.featuredImage.src;

  const imageAlt = typeof frontmatter.featuredImage === 'object'
    ? frontmatter.featuredImage.alt
    : frontmatter.title || "Featured Image";

  return (
    <Box
      sx={{
        width: "100%",
        // maxWidth: "500px",
        height: "300px", // Set a fixed height for the featured area
        position: "relative",
        mx: "auto",
        zIndex: 2,
        borderRadius: borderRadius.small, // Fallback if theme vars aren't loaded
        overflow: "hidden",
        // Using MUI's system for theme variables
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Image
        src={imageSrc || ""}
        alt={imageAlt || "Blog post cover"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        fill
        style={{
          borderRadius: borderRadius?.medium || "8px",
          objectFit: "cover"
        }}
        priority
      />
    </Box>
  );
}
