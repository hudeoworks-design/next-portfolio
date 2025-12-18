import Image from 'next/image';
import parse from 'html-react-parser';
import SocialLinks from "@/components/shared/SocialLinks";
import { getLayoutDirection } from "@/lib/utils";
import { Description, Face } from "@mui/icons-material";
import { Box, Avatar, Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import heroImage from "../../../../public/subash.jpeg";
import Link from '@/components/shared/Link';

export const AboutMe: React.FC = () => {
  const t = useTranslations('about');
  const params = useParams();
  const currentLocale = params.locale as string;

  const paragraphs = t.raw('aboutme.bioParagraphs') as Array<string>;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }}
      gap={3}
      mt={4}
    >
      {/* Avatar and Image component handling */}
      <Box flexShrink={0}>
        <Link href="/about">
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
        </Link>
      </Box>

      <Box flex={1} minWidth={0}>
        <Box display="flex" flexDirection="column" height="100%">
          {/* Profile Header */}
          <Box>
            <Typography variant="h4" component="h1" color="text.primary" mb={0.5}>
              {t('aboutme.name')}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={2}>
              {t('aboutme.handle')}
            </Typography>
            <Box display="flex" flexDirection="row" textAlign={'left'} gap={1} dir={getLayoutDirection(currentLocale)}>
              <Button
                color="primary"
                endIcon={<Face />}
                href="/about"
                sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
                variant="outlined"
              >
                {t('title')}
              </Button>
              <Button
                color="primary"
                endIcon={<Description />}
                href={t('resume.resumeLink')}
                rel="noopener noreferrer"
                target="_blank"
                sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
                variant="outlined"
              >
                {t('resume.resumeButton')}
              </Button>
              {/* <SocialLinks direction={getLayoutDirection(currentLocale)} /> */}
            </Box>

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
              {
                paragraphs.map((para, index) => (
                  <Typography key={index} variant="body1" color="text.secondary" lineHeight="relaxed">
                    {parse(para)}
                  </Typography>
                ))
              }
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}