"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";

interface SearchContainerProps {
  children: ReactNode;
}

export default function SearchContainer({ children }: SearchContainerProps) {
  return (
    <Box
      sx={{
        display: "flex",           // Layout props must be in sx or the parent must be a flex container
        flexDirection: "column",
        justifyContent: "center",
        pt: 1,
        pb: 7,
        // Safety check for CSS variables theme
        background: (theme) => 
          theme.vars?.palette.banner?.background || theme.palette.background.paper,
      }}
    >
      {children}
    </Box>
  );
}
