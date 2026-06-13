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

export default function FeaturesSection({ isDark, t }) {
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
        backgroundColor: 'background.paper',
        transition: 'background-color 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background circles */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        left: -120,
        width: 220,
        height: 220,
        borderRadius: '50%',
        background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '5%',
        right: -60,
        width: 160,
        height: 160,
        borderRadius: '50%',
        background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={landingHeaderSx}>
          <Typography variant="h2" sx={landingTitleSx}>
            {t('landing.featuresTitle')}
          </Typography>
          <Typography variant="body1" sx={landingSubtitleSx}>
            {t('landing.featuresSubtitle')}
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, md: 3 }}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  ...landingCardSx,
                  height: '100%',
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  position: 'relative',
                  background: 'background.default',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'primary.main',
                    boxShadow: isDark
                      ? '0 16px 40px rgba(255,255,255,0.03)'
                      : '0 16px 40px rgba(0,0,0,0.06)',
                  },
                }}
              >
                {/* Number badge */}
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 16,
                    fontSize: '2.25rem',
                    fontWeight: 900,
                    color: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  0{idx + 1}
                </Typography>

                {/* Icon box using theme palette */}
                <Box sx={{ ...iconFrameSx(48, 24), mb: 2.25 }}>
                  {feature.icon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.25, fontSize: '1.02rem', lineHeight: 1.25 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
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
