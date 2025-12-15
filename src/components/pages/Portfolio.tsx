'use client'; // This component uses hooks and interactive elements

import Image from 'next/image'; // Use the modern Next Image component
import { useTranslations } from 'next-intl'; // Import useTranslations hook
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ButtonGroup,
  Button,
} from '@mui/material/';
// Icons imported once at the top
import { ChevronRight, GitHub, Visibility } from '@mui/icons-material';

import Link from '../shared/Link'; 
import { getDataUrlWithShimmerEffect } from '@/lib/image-utils';
import ShortCenteredDivider from '../shared/ShortCenteredDivider'; 


// --- Define Interfaces for Type Safety (Corresponds to your data source from en.json) ---
interface ProjectData {
  id: string; 
  name: string; 
  projectUrl: string;
  repoUrl: string;
  imgPath: string;
  imgAlt: string; 
  summary: string; // The literal summary text is loaded here
  technologies: string[];
  keyFeatures: string[]; 
}

// --- Component Definition ---
export default function Portfolio() {
  // Use the correct scope name, assuming "Portfolio" matches your JSON structure's root key
  const t = useTranslations('portfolio'); 

  // Use .raw() to pull the entire 'projects' array data structure from the JSON
  const projectsData = t.raw('projects') as Array<ProjectData>;

  return (
    <Box component="section" id="portfolio" sx={{ pb: 8, pt: 10 }}>
      <Container>
        <Typography gutterBottom align="center" component="h2" variant="h3">
          {t('title')} 
        </Typography>

        <ShortCenteredDivider sx={{ mb: 4 }}/>

        <Grid container spacing={4}>
          {projectsData.map((project) => (
            // FIX 1: Use correct MUI Grid prop `xs` instead of deprecated `size`
            <Grid key={project.id} size={{ xs: 12}}>
              <Card
                elevation={4}
                sx={{
                  display: 'flex',
                  height: '100%',
                  flexDirection: {
                    xs: 'column',
                    lg: 'row',
                  },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    flex: {
                      lg: '1 1 600px',
                    },
                    minHeight: { xs: 200, sm: 300, lg: 370 },
                  }}
                >
                  <Image
                    alt={project.imgAlt} 
                    placeholder="blur"
                    blurDataURL={getDataUrlWithShimmerEffect(600, 370)}
                    src={`/${project.imgPath}`}
                    fill 
                    style={{ objectFit: 'cover' }} 
                  />

                  {/* Use the extracted overlay component */}
                  <PortfolioProjectOverlay
                    projectUrl={project.projectUrl}
                    repoUrl={project.repoUrl}
                  />
                </Box>

                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <Link
                      gutterBottom
                      href={project.projectUrl}
                      rel="noopener"
                      sx={{ display: 'inline-block' }}
                      target="_blank"
                      underline="hover"
                      variant="h5"
                    >
                      {project.name} 
                    </Link>
                    <Typography
                      color="textSecondary"
                      component="p"
                      variant="subtitle1"
                    >
                      {/* FIX 4: Use the literal summary text from the raw data */}
                      {project.summary} 
                    </Typography>

                    <List
                      dense
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > *': {
                          flex: {
                            xs: '0 0 100%',
                            lg: '0 0 50%',
                          },
                        },
                      }}
                    >
                      {project.keyFeatures.map((feature) => (
                        <ListItem key={feature}>
                          <ListItemIcon sx={{ minWidth: 34 }}>
                            <ChevronRight color="secondary" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </div>

                  <div>
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{ m: 0.5 }}
                        variant="outlined"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}


// --- Extracted Overlay Component ---

// Define the shape of the data needed for this specific component
interface OverlayProps {
  projectUrl: string;
  repoUrl: string;
}

// Define the actual React component
function PortfolioProjectOverlay({ projectUrl, repoUrl }: OverlayProps) {
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
