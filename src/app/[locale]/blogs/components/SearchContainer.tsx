'use client';

import { Box, Stack } from "@mui/material";
import Tag from "@/components/pages/blog/Tag";

interface SearchContainerProps {
  activeTag: string;
  tags: string[]; // Use a more specific type if possible
}

export default function SearchContainer({ activeTag, tags }: SearchContainerProps) {

  // tag click event
  const handleTagClick = (tag: string) => {
    return tag === activeTag ? "/blogs" : `/blogs?tag=${tag}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // Use the CSS variable string format for custom theme paths
        // This is serializable and works in Server Components
        bgcolor: "var(--mui-blogs-filterBgColor)",
        p: 3, // Added padding since it's a filter container
        borderRadius: 2
      }}
    >
      <Stack gap={3} direction="row" px={3} flexWrap="wrap">
        {tags.map((tag) => (
          <Tag
            label={tag}
            link={handleTagClick(tag)}
            key={tag}
            size="large"
            selected={tag === activeTag}
            bgColor="blogs.tagBgColor"
            selectedColor="blogs.tagSelectedColor"
          />
        ))}
      </Stack>
    </Box>
  );
}
