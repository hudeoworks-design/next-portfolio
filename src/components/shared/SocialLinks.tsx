import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useTranslations } from 'next-intl';

interface SocialLinksProps {
    direction: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ direction }) => {
    const t = useTranslations('about.socialLinks');

    return (
        <>
            <Box dir={direction}>
                <Button
                    endIcon={<TwitterIcon />}
                    href={t('twitter.url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    aria-label={t('twitter.ariaLabel')}
                    sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s', width: '100%' }}
                    variant="outlined"
                    dir={direction}
                >
                    {t('twitter.buttonText')}
                </Button>
            </Box>
            <Box dir={direction}>
                <Button
                    endIcon={<GitHubIcon />}
                    href={t('github.url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    aria-label={t('github.ariaLabel')}
                    sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s', width: '100%' }}
                    variant="outlined"
                    dir={direction}
                >
                    {t('github.buttonText')}
                </Button>
            </Box>
            <Box dir={direction}>
                <Button
                    endIcon={<LinkedInIcon />}
                    href={t('linkedin.url')}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    aria-label={t('linkedin.ariaLabel')}
                    sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s', width: '100%' }}
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