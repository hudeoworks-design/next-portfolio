import Image from 'next/image';
import SocialLinks from "@/components/shared/SocialLinks";
import { getLayoutDirection } from "@/lib/utils";
import { Description } from "@mui/icons-material";
import { Box, Avatar, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import heroImage from "../../../../public/subash.jpeg";

export const AboutMe: React.FC = () => {
  const t = useTranslations('about');
  const params = useParams();
  const currentLocale = params.locale as string;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={3}
      mt={4}
    >
      {/* Avatar and Image component handling */}
      <Box flexShrink={0}>
        <Avatar sx={{ width: 96, height: 96, ring: 2, borderColor: 'primary.main', ringOpacity: 0.2 }}>
          {/* Next/Image inside Avatar or a custom wrapper for better control */}
          <Image
            src={heroImage}
            alt={t('aboutme.profileAltText')} // Localized alt text
            style={{ objectFit: 'cover' }}
            fill
            sizes='100%'
            priority
          />
        </Avatar>

        <Box mt={5} display="flex" flexDirection="column" textAlign={'left'} gap={1}>
          <SocialLinks direction={getLayoutDirection(currentLocale)} />
          <Box pb={1}
            dir={getLayoutDirection(currentLocale)}>
            <Button
              color="primary"
              endIcon={<Description />}
              href={t('resume.resumeLink')}
              rel="noopener noreferrer"
              target="_blank"
              sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s', width: "100%" }}
              variant="outlined"
            >
              {t('resume.resumeButton')}
            </Button>

          </Box>
        </Box>
      </Box>

      <Box flex={1} minWidth={0}>
        <Box display="flex" flexDirection="column" height="100%">
          {/* Profile Header */}
          <Box>
            <Typography variant="h4" component="h1" color="text.primary" mb={0.5}>
              {t('aboutme.name')}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={3}>
              {t('aboutme.handle')}
            </Typography>
          </Box>

          {/* About Me Section */}
          <Box
            flex={1}
            bgcolor="background.default"
            borderRadius={2}
            p={2}
            mb={4}
            mt={2}
          >
            <Box display="flex" flexDirection="column" gap={1.5}>

              <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
                {t('aboutme.bioParagraph1')}
              </Typography>
              <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
                {t('aboutme.bioParagraph2')}
              </Typography>
              <Typography variant="body1" color="text.secondary" lineHeight="relaxed">
                {t('aboutme.bioParagraph3')}
              </Typography>
            </Box>
          </Box>


        </Box>
      </Box>
    </Box>
  );
}