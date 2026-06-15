import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SecurityIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PaidIcon from '@mui/icons-material/Paid';

import { iconFrameSx, landingCardSx, landingHeaderSx, landingSectionSx, landingSubtitleSx, landingTitleSx } from './styles';

export default function FeaturesSection({ t }) {
  const features = [
    {
      icon: <SecurityIcon />,
      title: t('landing.feature1Title'),
      desc: t('landing.feature1Desc'),
    },
    {
      icon: <FlashOnIcon />,
      title: t('landing.feature2Title'),
      desc: t('landing.feature2Desc'),
    },
    {
      icon: <DirectionsCarIcon />,
      title: t('landing.feature24Title'),
      desc: t('landing.feature24Desc'),
    },
    {
      icon: <PaidIcon />,
      title: t('landing.feature3Title'),
      desc: t('landing.feature3Desc'),
    },
  ];

  return (
    <Box
      id="features"
      sx={{
        ...landingSectionSx,
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={landingHeaderSx}>
          <Typography variant="h2" sx={landingTitleSx}>
            {t('landing.featuresTitle')}
          </Typography>
          <Typography variant="body1" sx={landingSubtitleSx}>
            {t('landing.featuresSubtitle')}
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 1.25, sm: 2, md: 3 }}>
          {features.map((feature, idx) => (
            <Grid item xs={6} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  ...landingCardSx,
                  height: '100%',
                  p: { xs: 1.35, sm: 2, md: 2.5 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  position: 'relative',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(255,255,255,0.32)',
                    boxShadow: '0 24px 70px rgba(0,0,0,0.34)',
                  },
                }}
              >
                {/* Number badge */}
                <Typography
                  sx={{
                    position: 'absolute',
                    top: { xs: 10, md: 12 },
                    right: { xs: 10, md: 16 },
                    fontSize: { xs: '1.6rem', md: '2.25rem' },
                    fontWeight: 900,
                    color: 'rgba(255,255,255,0.08)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  0{idx + 1}
                </Typography>

                {/* Icon box using theme palette */}
                <Box sx={{ ...iconFrameSx(40, 20), mb: { xs: 1.35, md: 2.25 } }}>
                  {feature.icon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, mb: { xs: 0.75, md: 1.25 }, fontSize: { xs: '0.86rem', md: '1.02rem' }, lineHeight: 1.25 }}>
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: { xs: 'rgba(255,255,255,0.88)', md: 'rgba(255,255,255,0.7)' },
                    fontSize: { xs: '0.72rem', md: '0.875rem' },
                    lineHeight: { xs: 1.45, md: 1.7 },
                    textShadow: { xs: '0 1px 4px rgba(0,0,0,0.8)', md: 'none' },
                  }}
                >
                  {feature.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
