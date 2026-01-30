"use client";

import { useState } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Box 
      sx={{ 
        my: 3, 
        p: 2, 
        border: "1px solid", 
        borderColor: "divider", 
        borderRadius: 2,
        width: "fit-content",
        bgcolor: "background.paper"
      }}
    >
      <Typography variant="subtitle2" sx={{ mb: 1, textAlign: "center", color: "text.secondary" }}>
        Interactive Demo: Counter
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <Button 
          variant="outlined" 
          size="small" 
          onClick={() => setCount((c) => c - 1)}
          sx={{ minWidth: 40 }}
        >
          -
        </Button>
        
        <Typography 
          variant="h6" 
          component="span" 
          sx={{ minWidth: 30, textAlign: "center", fontWeight: "bold" }}
        >
          {count}
        </Typography>

        <Button 
          variant="outlined" 
          size="small" 
          onClick={() => setCount((c) => c + 1)}
          sx={{ minWidth: 40 }}
        >
          +
        </Button>
      </Stack>
    </Box>
  );
}
