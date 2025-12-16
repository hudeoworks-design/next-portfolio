'use client';

import { useTranslations } from 'next-intl';
import {
  Container,
  Grid,
  Box,
  Card,
  Typography
} from '@mui/material';
import ProfessionalTimeline from '@/components/pages/home/Timeline';
import { AboutMe } from '@/components/pages/about/aboutme';
import SkillSet from '@/components/shared/SkillSet';

export default function AboutPage() {
  const t = useTranslations('about');
  return (
    <Container>
      <Grid>
        <Grid size={12}>
          <Box
            component="section"
            id="about"
            sx={{
              pt: 10,
              bgcolor: 'background.paper',
              color: 'text.primary'
            }}
          >
            <Grid container spacing={4}>
              {/* About Section */}
              <Card
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  px: 4,
                  height: '100%',
                  transition: 'background-color 0.3s'
                }}
              >
                <AboutMe />

                      <Box>
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, mt: 4, fontWeight: 700 }}>
          {t('skillsTitle')}
        </Typography>
      </Box>

                <SkillSet />

                <ProfessionalTimeline />

              </Card>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>

  );
}

// const AboutMeMui: React.FC = () => {
//   const t = useTranslations('about');
//   const params = useParams();
//   const currentLocale = params.locale as string;

//   return (
//     <Container disableGutters maxWidth={false}>
//       <Box
//         display="flex"
//         flexDirection={{ xs: 'column', md: 'row' }}
//         gap={3}
//         mt={4}
//       >
//         {/* Avatar and Image component handling */}
//         <Box flexShrink={0}>
//           <Avatar sx={{ width: 96, height: 96, ring: 2, borderColor: 'primary.main', ringOpacity: 0.2 }}>
//             {/* Next/Image inside Avatar or a custom wrapper for better control */}
//             <Image
//               src={heroImage}
//               alt={t('aboutme.profileAltText')} // Localized alt text
//               style={{ objectFit: 'cover' }}
//               fill
//               sizes='100%'
//               priority
//             />
//           </Avatar>

//           <Box mt={5} display="flex" flexDirection="column" textAlign={'left'} gap={1}>
//             <SocialLinks direction={getLayoutDirection(currentLocale)} />
//             <Box pb={1}
//               dir={getLayoutDirection(currentLocale)}>
//               <Button
//                 color="primary"
//                 endIcon={<Description />}
//                 href={t('resume.resumeLink')}
//                 rel="noopener noreferrer"
//                 target="_blank"
//                 sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s', width: "100%" }}
//                 variant="outlined"
//               >
//                 {t('resume.resumeButton')}
//               </Button>

//             </Box>
//           </Box>
//         </Box>

//         <Box flex={1} minWidth={0}>
//           <Box display="flex" flexDirection="column" height="100%">
//             {/* Profile Header */}
//             <Box>
//               <Typography variant="h4" component="h1" color="text.primary" mb={0.5}>
//                 {t('aboutme.name')}
//               </Typography>
//               <Typography variant="subtitle1" color="text.secondary" mb={3}>
//                 {t('aboutme.handle')}
//               </Typography>
//             </Box>

//             {/* About Me Section */}
//             <Box
//               flex={1}
//               bgcolor="background.default"
//               borderRadius={2}
//               p={2}
//               mb={4}
//               mt={2}
//             >
//               <Box display="flex" flexDirection="column" gap={1.5}>

//                 <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
//                   {t('aboutme.bioParagraph1')}
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
//                   {t('aboutme.bioParagraph2')}
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
//                   {t('aboutme.bioParagraph3')}
//                 </Typography>
//               </Box>
//             </Box>


//           </Box>
//         </Box>
//       </Box>
//       {/* Skills Section */}
//       <Box>
//         <Typography variant="h4" align="center" gutterBottom sx={{ mb: 3, mt: 4, fontWeight: 700 }}>
//           {t('skillsTitle')}
//         </Typography>
//       </Box>
//       <Box
//         flex={1}
//         bgcolor="background.default"
//         borderRadius={2}
//         p={2}
//         mb={4}
//         mt={2}
//       >
//         <Box display="flex" flexDirection="column" gap={1.5}>
//           <SkillSet />
//         </Box>
//       </Box>
//     </Container>
//   );
// }
