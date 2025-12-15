import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTranslations } from 'next-intl';

// Define the shape of the props the component expects
interface SocialLinksProps {
    direction: string;
}

// Update the component signature to accept a single props object,
// and destructure 'direction' from it.
const SocialLinks: React.FC<SocialLinksProps> = ({ direction }) => {
    // Assuming 'useTranslations' is available and correctly implemented
    const t = useTranslations('about.socialLinks');

    return (
        <>
            <Box p={1} dir={direction}>
                <Button
                    endIcon={<TwitterIcon />}
                    href={t('twitter.url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    aria-label={t('twitter.ariaLabel')}
                    sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
                    variant="outlined"
                    dir={direction}
                >
                    {t('twitter.buttonText')}
                </Button>
            </Box>
            <Box p={1} dir={direction}>
                <Button
                    endIcon={<GitHubIcon />}
                    href={t('github.url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    aria-label={t('github.ariaLabel')}
                    sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
                    variant="outlined"
                    dir={direction}
                >
                    {t('github.buttonText')}
                </Button>
            </Box>
            <Box p={1} dir={direction}>
                <Button
                    endIcon={<LinkedInIcon />}
                    href={t('linkedin.url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    aria-label={t('linkedin.ariaLabel')}
                    sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s' }}
                    variant="outlined"
                    dir={direction}
                >
                    {t('linkedin.buttonText')}
                </Button>
            </Box>
        </>
    );
}

export default SocialLinks;