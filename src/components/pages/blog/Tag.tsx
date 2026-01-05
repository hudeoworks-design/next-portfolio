"use client";

import { JSX, forwardRef } from "react";
import { Chip, SxProps, Theme } from "@mui/material";
import { borderRadius } from "@/styles/themes/tokens";
import Link from "@/components/shared/Link";
import { TagProps } from "@/lib/types/blog";

/**
 * 1. Create a Type-Safe Bridge
 * MUI's 'component' prop requires a component that handles refs correctly.
 * We cast the props to 'any' inside the bridge to bypass the conflict 
 * between MUI's 'href' expectations and next-intl's 'href' generics.
 */
const TagLink = forwardRef<HTMLAnchorElement, any>((props, ref) => (
  <Link href={""} ref={ref} {...props} />
));
TagLink.displayName = "TagLink";

const sizeConfigs = {
  small: {
    height: "20px",
    fontSize: "0.75rem",
    fontWeight: 600,
    px: 1,
  },
  medium: {
    height: "28px",
    fontSize: "0.875rem",
    fontWeight: 500,
    px: 2,
  },
  large: {
    height: "36px",
    fontSize: "1rem",
    fontWeight: 500,
    px: 2,
  },
};

const Tag = ({
  size = "medium",
  label,
  link,
  selected = false,
  bgColor,
  textColor,
  selectedColor,
  sx,
  ...other
}: TagProps): JSX.Element => {
  
  const activeSize = sizeConfigs[size];

  const combinedSx: SxProps<Theme> = {
    borderRadius: borderRadius.pill,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    
    // Use theme palette tokens for better Dark Mode support
    backgroundColor: selected 
        ? (selectedColor || "primary.main") 
        : (bgColor || "action.hover"),
    color: textColor || "text.primary",
    
    ...activeSize,

    "& .MuiChip-label": {
      textTransform: "capitalize",
      px: 0, 
    },

    "&:hover": {
      backgroundColor: selected ? selectedColor : "action.selected",
      opacity: 0.9,
    },
    
    ...sx,
  };

  return (
    <Chip
      {...other}
      // Pass our bridge component
      component={TagLink}
      // Link props are passed through the bridge
      href={link} 
      label={label.replace(/-/g, " ")}
      clickable
      sx={combinedSx}
    />
  );
};

export default Tag;
