import { GitHub, Visibility } from "@mui/icons-material";
import { Box, ButtonGroup, Button } from "@mui/material";
import { useTranslations } from "next-intl";

// Define the shape of the data needed for this specific component
interface OverlayProps {
  projectUrl: string;
  repoUrl: string;
}

// Define the actual React component
export function ImageOverlay({ projectUrl, repoUrl }: OverlayProps) {
  // FIX 3: Ensure this scope matches the parent component's scope ('Portfolio')
  const t = useTranslations('portfolio');

  // Styles are defined within the component scope
  const overlayStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7);',
    opacity: 0,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      opacity: 1,
    },
    zIndex: 1, // Ensure it sits above the image
  };

  return (
    <Box sx={overlayStyles}>
      <ButtonGroup variant="contained">
        <Button
          aria-label={t('repoAriaLabel')}
          component="a"
          href={repoUrl}
          rel="noopener"
          startIcon={<GitHub />}
          target="_blank"
        >
          {t('repoButtonText')}
        </Button>
        <Button
          aria-label={t('liveAriaLabel')}
          component="a"
          href={projectUrl}
          rel="noopener"
          startIcon={<Visibility />}
          target="_blank"
        >
          {t('liveButtonText')}
        </Button>
      </ButtonGroup>
    </Box>
  );
}