import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import type { Theme } from "@mui/material/styles";

export const CustomDivider = styled(Divider)(({ theme }: { theme: Theme }) => ({
  height: '4px',
  width: '60px',
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));