import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SecurityIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PaidIcon from '@mui/icons-material/Paid';

export default function FeaturesSection({ isDark, t }) {
  const theme = useTheme();

  const features = [
    {
      icon: <SecurityIcon fontSize="large" />,
      title: t('landing.feature1Title'),
      desc: t('landing.feature1Desc'),
    },
    {
      icon: <FlashOnIcon fontSize="large" />,
      title: t('landing.feature2Title'),
      desc: t('landing.feature2Desc'),
    },
    {
      icon: <DirectionsCarIcon fontSize="large" />,
      title: t('landing.feature24Title'),
      desc: t('landing.feature24Desc'),
    },
    {
      icon: <PaidIcon fontSize="large" />,
      title: t('landing.feature3Title'),
      desc: t('landing.feature3Desc'),
    },
  ];

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
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
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)',
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '5%',
        right: -60,
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, mb: 2 }}>
            {t('landing.featuresTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
            {t('landing.featuresSubtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  p: 2.5,
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  position: 'relative',
                  background: 'background.default',
                  border: `1px solid`,
                  borderColor: 'divider',
                  boxShadow: 'none',
                  transition: 'all 0.35s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
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
                    fontSize: '2.5rem',
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
                <Box sx={{
                  p: 1.8,
                  borderRadius: 3,
                  mb: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'action.selected',
                  color: 'primary.main',
                }}>
                  {feature.icon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, fontSize: '1.05rem' }}>
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
