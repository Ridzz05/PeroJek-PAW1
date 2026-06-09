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
      icon: <SecurityIcon fontSize="large" sx={{ color: isDark ? '#FFF' : '#0A0A0A' }} />,
      title: t('landing.feature1Title'),
      desc: t('landing.feature1Desc'),
    },
    {
      icon: <FlashOnIcon fontSize="large" sx={{ color: isDark ? '#FFF' : '#0A0A0A' }} />,
      title: t('landing.feature2Title'),
      desc: t('landing.feature2Desc'),
    },
    {
      icon: <DirectionsCarIcon fontSize="large" sx={{ color: isDark ? '#FFF' : '#0A0A0A' }} />,
      title: t('landing.feature24Title'),
      desc: t('landing.feature24Desc'),
    },
    {
      icon: <PaidIcon fontSize="large" sx={{ color: isDark ? '#FFF' : '#0A0A0A' }} />,
      title: t('landing.feature3Title'),
      desc: t('landing.feature3Desc'),
    },
  ];

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: isDark ? '#080808' : '#FAF9F6',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
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
                  p: 2,
                  borderRadius: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  background: isDark ? '#141414' : '#FFFFFF',
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    borderColor: 'primary.main',
                    boxShadow: isDark ? '0 12px 30px rgba(255,255,255,0.02)' : '0 12px 30px rgba(0,0,0,0.04)',
                  },
                }}
              >
                <Box sx={{ p: 1.5, borderRadius: 3, backgroundColor: isDark ? '#1F1F1F' : '#F5F5F3', mb: 2.5 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, fontSize: '1.05rem' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
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
