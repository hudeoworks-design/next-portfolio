import { WidthFull } from '@mui/icons-material';
import { Box, Grid, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <Box
      sx={{
        minHeight: {
          xs: '100vh',
          lg: '95vh',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: {
          lg: `url('/hero-graphic.svg')`,
        },
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right -2rem bottom',
        backgroundSize: '60%'
      }}
    >
      <Box mb={7} sx={{ width: '50%'}}>
        <Typography gutterBottom component="h4" variant="h5">
          <Typography color="primary" component="span" variant="inherit">
            {t('greetings')}
          </Typography>
          {t('introduction')}
        </Typography>

        <Typography gutterBottom component="h1" variant="h2">
          {t('role')}
        </Typography>

        <Typography color="textSecondary" component="p" variant="subtitle1">
          {t('paragraph')}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid>
          <Button
            color="primary"
            href="#portfolio"
            size="large"
            variant="contained"
          >
            {t('button1')}
          </Button>
        </Grid>
        <Grid>
          <Button
            color="primary"
            href="#contact"
            size="large"
            variant="outlined"
          >
            {t('button2')}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
