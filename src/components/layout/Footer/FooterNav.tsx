'use client';

import React, { JSX } from "react";
import { Box, Stack } from "@mui/material";
import AnimatedLink from "@/components/shared/ui/AnimatedLink";
import { useNavigationLinks } from "@/lib/navUtils";

const FooterNav = (): JSX.Element => {
  const { menuItems } = useNavigationLinks();

  return (
    <Stack direction="row" gap={2}>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
        {menuItems.map((item) => (
          <AnimatedLink
            key={item.name}
            href={item.link}
            variant="button"
            color="text.primary"
          >
            {item.name}
          </AnimatedLink>
        ))}
      </Box>
    </Stack>
  );
};

export default FooterNav;
