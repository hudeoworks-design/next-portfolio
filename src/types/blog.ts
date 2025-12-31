export interface Blog {
  slug: string;
  title: string;
  date: string;
  featuredImage: string | { src: string; alt: string }; // Support both formats
  tags: string | string[]; // Support CSV string or Array
  description: string;
  [key: string]: any;
}

export interface FeaturedImage {
  src: string;
  alt: string;
} 

export interface Tag {
  label: string;
  link: string;
  size?: "small" | "medium" | "large";
  selected?: boolean;
  bgColor?: string;
  selectedColor?: string;
}

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

export interface RecentArticlesProps {
  count?: number;
}

export interface EmailSubscriptionProps {
  title?: string;
  description?: string;
}

export interface BlogPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    tag?: string;
  };
}

export interface BlogListProps {
  allBlogs: Blog[];
}

export interface PaginatedBlogsProps {
  paginatedBlogs: Blog[];
}

export interface PaginationProps {
  totalBlogs: number;
  blogsPerPage: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export interface TagProps {
  size?: "small" | "large";
  label: string;
  link: string;
  selected?: boolean;
  bgColor?: string;
  selectedColor?: string;
  key?: number | string;
} 

export interface SearchContainerProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export interface FooterProps {  
  copyright?: string; 
  links?: { label: string; url: string }[];
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface PostCardImage {
  src: string;
  alt: string;
}

export interface PostCardProps {  
  title: string;
  image: string | PostCardImage;
  tags: string;
  description: string;
  link: string;
  maxWidth?: { xs: number; lg: number };
} 
export interface BlogListProps {
  paginatedBlogs: Blog[];
}

export interface BlogListProps {
  paginatedBlogs: Blog[];
}