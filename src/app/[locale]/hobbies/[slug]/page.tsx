'use client';

import { Container, Stack, Box } from "@mui/material";
import { usePathname, useSearchParams, useRouter } from "next/navigation"; // Use next/navigation, NOT next/router
import { use } from "react"; // Required to unwrap params in Client Components

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function HobbyCategoryPage({ params }: PageProps) {
  // 1. Unwrap the params Promise using the 'use' hook
  const { slug } = use(params);
  
  // 2. Standard Client Component Hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const activeField = searchParams.get('category') || '';
  
  console.log(slug, activeField);

  return (
    <Container sx={{ py: 2 }}>
      <Stack gap={7} direction={{ xs: "column", lg: "row" }}>
        <Box sx={{ flexGrow: 1, width: '100%', maxWidth: '800px' }}>
          <h1>Slug: {slug}</h1>
          <p>Active Category: {activeField}</p>
        </Box>
      </Stack>
    </Container>
  );
}
