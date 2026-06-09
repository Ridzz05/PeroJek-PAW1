import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, keyframes } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import StarIcon from '@mui/icons-material/Star';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const statItems = [
  { key: 'statVehicles', labelKey: 'statVehiclesLabel', icon: <DirectionsCarIcon sx={{ fontSize: 20 }} /> },
  { key: 'statCustomers', labelKey: 'statCustomersLabel', icon: <PeopleIcon sx={{ fontSize: 20 }} /> },
  { key: 'statCities', labelKey: 'statCitiesLabel', icon: <LocationCityIcon sx={{ fontSize: 20 }} /> },
  { key: 'statRating', labelKey: 'statRatingLabel', icon: <StarIcon sx={{ fontSize: 20 }} /> },
];

export default function HeroSection({ heroImages, heroIndex, scrollToSection, handleBookNow, t }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: { xs: '100svh', md: 'calc(100svh - 72px)' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#FFFFFF',
        pt: { xs: 8, md: 0 },
        pb: { xs: 14, md: 10 },
      }}
    >
      {/* Background images */}
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
            objectPosition: { xs: 'center 30%', md: 'center center' },
            opacity: heroIndex === index ? 1 : 0,
            transform: heroIndex === index ? 'scale(1)' : 'scale(1.035)',
            transition: 'opacity 900ms ease, transform 4200ms ease',
            zIndex: 0,
          }}
        />
      ))}

      {/* Gradient overlay - lighter on mobile for better bg visibility */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: {
            xs: 'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.78) 100%)',
            md: 'linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.56) 38%, rgba(0,0,0,0.14) 74%, rgba(0,0,0,0.04) 100%)',
          },
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, sm: 3, lg: 4 }, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Box sx={{
          maxWidth: { xs: '100%', sm: 620, md: 640 },
          mx: { xs: 'auto', md: 0 },
          textAlign: { xs: 'center', md: 'left' },
          animation: `${fadeInUp} 0.8s ease-out`,
        }}>
          <Chip
            label={t('landing.tagline')}
            size="small"
            sx={{
              mb: { xs: 2, md: 3 },
              height: { xs: 26, md: 28 },
              px: 0.5,
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: { xs: '0.7rem', md: '0.8125rem' },
              backgroundColor: 'rgba(255,255,255,0.16)',
              border: '1px solid rgba(255,255,255,0.28)',
              backdropFilter: 'blur(10px)',
            }}
          />
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '3rem', md: '4.6rem' },
              fontWeight: 900,
              lineHeight: { xs: 1.1, md: 1.02 },
              letterSpacing: 0,
              mb: { xs: 2, md: 2.5 },
              color: '#FFFFFF',
              textShadow: '0 8px 30px rgba(0,0,0,0.5)',
            }}
          >
            {t('landing.titleHighlight')}
            {t('landing.titleRest')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.15rem' },
              mb: { xs: 3, md: 4 },
              maxWidth: { xs: '100%', md: 600 },
              mx: { xs: 'auto', md: 0 },
              fontWeight: 500,
              lineHeight: { xs: 1.6, md: 1.65 },
              textShadow: '0 6px 20px rgba(0,0,0,0.4)',
            }}
          >
            {t('landing.subtitle')}
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 1, md: 1.5 }, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => scrollToSection('fleet')}
              sx={{
                borderRadius: 2,
                fontWeight: 800,
                px: { xs: 2.5, sm: 4 },
                py: { xs: 1.1, md: 1.4 },
                fontSize: { xs: '0.85rem', md: '0.9375rem' },
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
                px: { xs: 2.5, sm: 4 },
                py: { xs: 1.1, md: 1.4 },
                fontSize: { xs: '0.85rem', md: '0.9375rem' },
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

      {/* Scroll-down indicator (desktop only) */}
      {!isMobile && (
        <Box
          onClick={() => scrollToSection('features')}
          sx={{
            position: 'absolute',
            bottom: 90,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
            cursor: 'pointer',
            animation: `${bounce} 2s infinite`,
          }}
        >
          <KeyboardArrowDownIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 28 }} />
        </Box>
      )}

      {/* Stats bar overlay at bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          background: {
            xs: 'rgba(0,0,0,0.6)',
            md: 'rgba(0,0,0,0.35)',
          },
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 3, lg: 4 } }}>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: { xs: 0, sm: 2 },
            py: { xs: 2, md: 2.5 },
          }}>
            {statItems.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { xs: 1, md: 1.5 },
                  py: { xs: 1, sm: 0 },
                  borderRight: { xs: 'none', sm: idx < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none' },
                  borderBottom: { xs: idx < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', sm: 'none' },
                }}
              >
                <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 900, fontSize: { xs: '1.1rem', md: '1.3rem' }, color: '#FFF', lineHeight: 1.1 }}>
                    {t(`landing.${item.key}`)}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.65rem', md: '0.75rem' }, color: 'rgba(255,255,255,0.6)', fontWeight: 600, lineHeight: 1.2 }}>
                    {t(`landing.${item.labelKey}`)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Hero image indicators (dots) */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: '50%', md: 28 },
          bottom: { xs: 78, md: 18 },
          zIndex: 3,
          display: 'flex',
          gap: 0.75,
          alignItems: 'center',
          px: 1.1,
          py: 0.75,
          borderRadius: 999,
          backgroundColor: 'rgba(0,0,0,0.32)',
          backdropFilter: 'blur(8px)',
          transform: { xs: 'translateX(50%)', md: 'none' },
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
