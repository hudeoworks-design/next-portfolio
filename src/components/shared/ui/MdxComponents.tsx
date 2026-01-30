import { TypographyProps, Typography, Box } from "@mui/material";

export const mdxComponents = {
  h1: (props: TypographyProps) => <Typography variant="h3" component="h1" gutterBottom {...props} />,
  p: (props: TypographyProps) => <Typography variant="body1" {...props} />,
  YouTube: ({ id } : { id: string }) => (
    <Box sx={{ position: 'relative', pt: '56.25%', my: 4 }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
        allowFullScreen
      />
    </Box>
  ),
};