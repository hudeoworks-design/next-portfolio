import Image from 'next/image'; // Use the modern Next Image component
import { getDataUrlWithShimmerEffect } from "@/lib/image-utils";
import { ChevronRight } from "@mui/icons-material";
import { Grid, Card, Box, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Chip } from "@mui/material";
import { ProjectData } from "../Portfolio";
import Link from '@/components/shared/Link';
import { ImageOverlay } from '@/components/shared/ui/ImageOverlay';

interface ProjectsProps {
  projectItems: ProjectData[];
}

export const Projects: React.FC<ProjectsProps> = ({ projectItems }) => {
  return (
    <Grid container spacing={4}>
      {
        projectItems.map((project: ProjectData) => (
          <Grid key={project.name} size={{ xs: 12, md: 6 }}>
            <Card>
              <Box sx={{ position: 'relative', width: '100%', height: 140, paddingBottom: '61.67%' }}>
                <Image
                  alt={project.imgAlt}
                  placeholder="blur"
                  blurDataURL={getDataUrlWithShimmerEffect(600, 370)}
                  src={`/${project.imgPath}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />

                <ImageOverlay links={project.links} />
              </Box>
              <Box
                bgcolor="background.default"
                p={2}
              >
                <CardContent>

                  <div>
                    <Link
                      gutterBottom
                      href={project.links.filter(link => link.type === 'live')[0]?.url || '#'}
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
                      {project.keyFeatures.map((feature: string) => (
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
                    {project.technologies.map((tech: string) => (
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
              </Box>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  );
}