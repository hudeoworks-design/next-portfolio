import { Box, ButtonGroup, Button } from "@mui/material";
import DynamicMuiIcon from "./DynamicMuiIcon";
import { LinkProps } from "@/lib/types/blog";

export function ImageOverlay({ links }: LinkProps) {
  const overlayStyles = {
    position: 'absolute',
    top: 0, 
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    opacity: 0,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      opacity: 1,
    },
    zIndex: 1,
  };

  return (
    <Box sx={overlayStyles}>
      <ButtonGroup variant="contained">
        {
          links && links?.map((link) => (
            <Button
              key={link.type} 
              aria-label={link.type}
              component="a"
              href={link.url}
              rel="noopener"
              target="_blank"
              startIcon={<DynamicMuiIcon iconName={link.icon} />}
            >
              {link.type}
            </Button>
          ))
        }
      </ButtonGroup>
    </Box>
  );
}
