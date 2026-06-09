import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

export default function HeroSection({ heroImages, heroIndex, scrollToSection, handleBookNow, t }) {
  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: { xs: 'calc(100svh - 112px)', md: 'calc(100svh - 120px)' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        color: '#FFFFFF',
        py: { xs: 7, md: 8 },
      }}
    >
      {heroImages.map((image, index) => (
        <Box
          key={image}
          component="img"
          src={image}
          alt={`Smart Rental hero vehicle ${index + 1}`}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: { xs: '62% center', md: 'center center' },
            opacity: heroIndex === index ? 1 : 0,
            transform: heroIndex === index ? 'scale(1)' : 'scale(1.035)',
            transition: 'opacity 900ms ease, transform 4200ms ease',
            zIndex: 0,
          }}
        />
      ))}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: {
            xs: 'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 56%, rgba(0,0,0,0.22) 100%)',
            md: 'linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.56) 38%, rgba(0,0,0,0.14) 74%, rgba(0,0,0,0.04) 100%)',
          },
          pointerEvents: 'none',
        }}
      />
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box sx={{ maxWidth: { xs: 620, md: 640 } }}>
          <Chip
            label={t('landing.tagline')}
            size="small"
            sx={{
              mb: 3,
              height: 28,
              px: 0.5,
              color: '#FFFFFF',
              fontWeight: 800,
              backgroundColor: 'rgba(255,255,255,0.16)',
              border: '1px solid rgba(255,255,255,0.28)',
              backdropFilter: 'blur(10px)',
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.6rem' },
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: 0,
              mb: 2.5,
              color: '#FFFFFF',
              textShadow: '0 12px 40px rgba(0,0,0,0.45)',
            }}
          >
            {t('landing.titleHighlight')}
            {t('landing.titleRest')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.82)',
              fontSize: { xs: '1rem', md: '1.15rem' },
              mb: 4,
              maxWidth: 600,
              fontWeight: 500,
              lineHeight: 1.65,
              textShadow: '0 8px 28px rgba(0,0,0,0.42)',
            }}
          >
            {t('landing.subtitle')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => scrollToSection('fleet')}
              sx={{
                borderRadius: 2,
                fontWeight: 800,
                px: { xs: 3, sm: 4 },
                py: 1.4,
                backgroundColor: '#FFFFFF',
                color: '#0A0A0A',
                '&:hover': { backgroundColor: '#EDEDED' },
              }}
            >
              {t('landing.exploreBtn')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleBookNow}
              sx={{
                borderRadius: 2,
                fontWeight: 800,
                px: { xs: 3, sm: 4 },
                py: 1.4,
                color: '#FFFFFF',
                borderColor: 'rgba(255,255,255,0.7)',
                backgroundColor: 'rgba(0,0,0,0.16)',
                backdropFilter: 'blur(8px)',
                '&:hover': {
                  borderColor: '#FFFFFF',
                  backgroundColor: 'rgba(255,255,255,0.12)',
                },
              }}
            >
              {t('landing.startBtn')}
            </Button>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 16, md: 28 },
          bottom: { xs: 14, md: 18 },
          zIndex: 1,
          display: 'flex',
          gap: 0.75,
          alignItems: 'center',
          px: 1.1,
          py: 0.75,
          borderRadius: 999,
          backgroundColor: 'rgba(0,0,0,0.32)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {heroImages.map((image, index) => (
          <Box
            key={image}
            sx={{
              width: heroIndex === index ? 18 : 7,
              height: 7,
              borderRadius: 999,
              backgroundColor: heroIndex === index ? '#FFFFFF' : 'rgba(255,255,255,0.42)',
              transition: 'width 0.25s ease, background-color 0.25s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
