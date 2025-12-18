"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

interface BlogContentProps {
  mdxContent: ReactNode;
}

export default function BlogContent({ mdxContent }: BlogContentProps) {
  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", md: "720px" },
        margin: { xs: "auto", lg: "0" }, // Use 0 instead of inherit for margin
      }}
    >
      <Box
        component="article"
        sx={{
          // Global spacing for article elements
          "& > * + *": { mt: 3 },

          "& h1": {
            color: "blog.h1Color",
            fontSize: { xs: "2.2rem", md: "2.8rem" },
            fontWeight: 600,
            lineHeight: 1.2,
            // FIX: Removed the space to correctly target the H1 itself
            "&:first-of-type": { mt: 0 } 
          },
          
          "& h2": { fontSize: "1.8rem", mt: 6, mb: 2 },
          "& h3": { fontSize: "1.5rem", mt: 4, mb: 2 },
          
          "& h2, & h3, & h4, & h5, & h6": {
            color: "text.primary",
            fontWeight: 600,
            lineHeight: 1.3,
          },

          "& p": {
            color: "text.primary",
            lineHeight: 1.7,
            fontSize: "1.1rem",
          },

          "& figure": { m: 0 },

          "& pre": {
            my: 4,
            p: 3,
            borderRadius: 2,
            overflowX: "auto",
            position: "relative",
            // Dark/Light mode support using MUI theme palette
            bgcolor: (theme) => 
              theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'grey.900',
            color: "grey.100",
            border: "1px solid",
            borderColor: "divider",
            fontFamily: "monospace",
            fontSize: "0.9rem",
          },

          // Inline Code
          "& :not(pre) > code": {
            backgroundColor: (theme) => 
              theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'grey.100',
            color: "secondary.main",
            borderRadius: 1,
            px: 1,
            py: 0.5,
            fontSize: "0.9em",
            fontFamily: "monospace",
          },

          "& ul, & ol": {
            pl: 3,
            "& li": { mb: 1, lineHeight: 1.6 }
          },

          // Rehype Pretty Code Highlighted Line
          "& [data-highlighted-line]": {
            background: "rgba(200, 200, 255, 0.1)",
            borderLeft: "4px solid",
            borderColor: "secondary.main",
            mx: -3, // Offset the pre padding
            px: 3,
          },
          
          "& [data-line]": {
            display: "block",
            minHeight: "1rem",
          }
        }}
      >
        {mdxContent}
      </Box>
    </Box>
  );
}
