import React, { JSX } from "react";
import { Typography, Link } from "@mui/material";

const Attribution = (): JSX.Element => (
  <Typography variant="body2" color="text.secondary" mt={1}>
    Made by
    <Link
      href="https://muhimasri.com"
      color="primary"
      underline="hover"
      variant="body2"
      px={1}
    >
      Bodhi Systems
    </Link>
  </Typography>
);

export default Attribution;
