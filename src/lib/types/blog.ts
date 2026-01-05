import { IconNames } from "@/components/shared/ui/DynamicMuiIcon";
import { ChipProps } from "@mui/material/Chip";
import { ReactNode } from "react";

export interface Blog {
  slug: string;
  title: string;
  date: string;
  featuredImage: string | { src: string; alt: string }; // Support both formats
  tags: string | string[]; // Support CSV string or Array
  description: string;
  [key: string]: any;
}

export interface BlogData {
  id: string;
  name: string;
  blogLink: string;
  imgPath: string;
  imgAlt: string;
  summary: string; // The literal summary text is loaded here
  tags: string[];
}

export interface BlogProps {
  blogItems: BlogData[];
}

export interface BlogContentProps {
  mdxContent: ReactNode;
}

// Image
export interface FeaturedImage {
  src: string;
  alt: string;
} 

export interface FeaturedImageProps {
  frontmatter: {
    title?: string;
    featuredImage: string | { src: string; alt?: string };
  };
}

export interface ImageOverlayProps {
  type: string;
  url: string;
  icon: IconNames;
}

export interface LinkProps {
  links: ImageOverlayProps[];
}

// Blog posts
export interface PostCardProps {  
  title: string;
  image: string | FeaturedImage;
  tags: string;
  description: string;
  link: string;
  maxWidth?: { xs: number; lg: number };
}

export interface SuggestedArticlesProps {
  currentTags: string[];
}

export interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// toc
export interface TOCProps {
  headings: { text: string; slug: string; depth: number }[];
}

// tags
export type TagProps = {
  size?: "small" | "medium" | "large";
  label: string;
  link: string;
  selected?: boolean;
  bgColor?: string;
  textColor?: string;
  selectedColor?: string;
} & Omit<ChipProps, "size" | "component">;

export interface SearchContainerProps {
  activeTag: string;
  tags: string[]; // Use a more specific type if possible
}