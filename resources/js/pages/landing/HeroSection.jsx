import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, keyframes } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { iconFrameSx } from './styles';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const statItems = [
  { key: 'statVehicles', labelKey: 'statVehiclesLabel', icon: <DirectionsCarIcon /> },
  { key: 'statCustomers', labelKey: 'statCustomersLabel', icon: <PeopleIcon /> },
  { key: 'statCities', labelKey: 'statCitiesLabel', icon: <LocationCityIcon /> },
  { key: 'statRating', labelKey: 'statRatingLabel', icon: <StarIcon /> },
];

export default function HeroSection({ isDark, heroImages, heroIndex, setHeroIndex, scrollToSection, handleBookNow, setSearchQuery, t }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [quickSearch, setQuickSearch] = useState('');

  const handleQuickSearch = () => {
    if (quickSearch.trim()) {
      setSearchQuery(quickSearch.trim());
    }
    scrollToSection('fleet');
  };

  const today = new Date().toISOString().split('T')[0];
  const isOverDark = isDark;

  const inputSx = {
    borderRadius: '8px',
    backgroundColor: isOverDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
    color: isOverDark ? '#FFFFFF' : '#0A0A0A',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: isOverDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: isOverDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: isOverDark ? '#FFFFFF' : '#0A0A0A' },
    '& input::placeholder': { color: isOverDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', opacity: 1 },
    '& input': { color: isOverDark ? '#FFFFFF' : '#0A0A0A' },
    '& input[type="date"]::-webkit-calendar-picker-indicator': { filter: isOverDark ? 'invert(1)' : 'none', cursor: 'pointer' },
    '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: isOverDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' },
  };

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
        pt: { xs: 7, md: 0 },
        pb: { xs: 16, md: 8 },
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

      {/* Gradient overlay */}
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: { xs: 3, md: 5 },
        }}>
          {/* Left: Text content + mobile search */}
          <Box sx={{
            maxWidth: { xs: '100%', sm: 620, md: 640 },
            mx: 0,
            textAlign: 'left',
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
                fontSize: { xs: '2rem', sm: '2.85rem', md: '4.15rem', lg: '4.35rem' },
                fontWeight: 900,
                lineHeight: { xs: 1.1, md: 1.04 },
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
                mx: 0,
                fontWeight: 500,
                lineHeight: { xs: 1.6, md: 1.65 },
                textShadow: '0 6px 20px rgba(0,0,0,0.4)',
              }}
            >
              {t('landing.subtitle')}
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 1, md: 1.5 }, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => scrollToSection('fleet')}
                sx={{
                  borderRadius: '8px',
                  fontWeight: 800,
                  px: { xs: 2.25, sm: 3.25 },
                  py: { xs: 1, md: 1.25 },
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
                  borderRadius: '8px',
                  fontWeight: 800,
                  px: { xs: 2.25, sm: 3.25 },
                  py: { xs: 1, md: 1.25 },
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

            {/* Mobile search — inline after CTA */}
            {isMobile && (
              <Box
                component="form"
                onSubmit={(e) => { e.preventDefault(); handleQuickSearch(); }}
                sx={{ maxWidth: 520, mx: 0, mt: 3, animation: `${fadeIn} 0.6s ease-out 0.3s both` }}
              >
                <TextField
                  placeholder={t('landing.searchPlaceholder')}
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ mr: -0.5 }}>
                        <IconButton
                          type="submit"
                          size="small"
                          sx={{
                            borderRadius: '8px',
                            color: isOverDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
                            '&:hover': { backgroundColor: isOverDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' },
                          }}
                        >
                          <SearchIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { ...inputSx, pr: 1 },
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Right: Quick Booking Card (desktop only) */}
          {!isMobile && (
            <Card
              sx={{
                minWidth: 320,
                maxWidth: 380,
                p: 2.5,
                borderRadius: '8px',
                backgroundColor: isOverDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: isOverDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)',
                boxShadow: isOverDark ? '0 20px 60px rgba(0,0,0,0.3)' : '0 20px 60px rgba(0,0,0,0.15)',
                animation: `${fadeIn} 0.6s ease-out 0.3s both`,
              }}
            >
              <Box
                component="form"
                onSubmit={(e) => { e.preventDefault(); handleQuickSearch(); }}
              >
                <Typography sx={{ color: isOverDark ? '#FFFFFF' : '#0A0A0A', fontWeight: 800, fontSize: '1rem', mb: 2 }}>
                  {t('landing.quickFind')}
                </Typography>

                <TextField
                  placeholder={t('landing.searchPlaceholder')}
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          size="small"
                          sx={{
                            borderRadius: '8px',
                            color: isOverDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
                            '&:hover': { backgroundColor: isOverDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)' },
                          }}
                        >
                          <SearchIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { ...inputSx, mb: 2, pr: 1 },
                  }}
                />

                <Box sx={{ display: 'flex', gap: 1.25 }}>
                  <TextField
                    type="date"
                    defaultValue={today}
                    size="small"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon sx={{ fontSize: 16 }} />
                        </InputAdornment>
                      ),
                      sx: inputSx,
                    }}
                  />
                  <TextField
                    type="date"
                    defaultValue={today}
                    size="small"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarTodayIcon sx={{ fontSize: 16 }} />
                        </InputAdornment>
                      ),
                      sx: inputSx,
                    }}
                  />
                </Box>
              </Box>

            </Card>
          )}
        </Box>
      </Container>

      {/* Scroll-down indicator */}
      <Box
        onClick={() => scrollToSection('features')}
        sx={{
          position: 'absolute',
          bottom: { xs: 132, md: 82 },
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
        <KeyboardArrowDownIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 26 }} />
      </Box>

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
            py: { xs: 1.25, md: 1.75 },
          }}>
            {statItems.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { xs: 0.85, md: 1.1 },
                  py: { xs: 0.75, sm: 0 },
                  borderRight: { xs: 'none', sm: idx < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none' },
                  borderBottom: { xs: idx < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', sm: 'none' },
                }}
              >
                <Box sx={{ ...iconFrameSx(32, 18), backgroundColor: 'rgba(255,255,255,0.12)', color: '#FFFFFF' }}>
                  {item.icon}
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 900, fontSize: { xs: '1rem', md: '1.2rem' }, color: '#FFF', lineHeight: 1.1 }}>
                    {t(`landing.${item.key}`)}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: '0.62rem', md: '0.72rem' }, color: 'rgba(255,255,255,0.66)', fontWeight: 600, lineHeight: 1.2 }}>
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
          bottom: { xs: 94, md: 18 },
          zIndex: 3,
          display: 'flex',
          gap: 0.75,
          alignItems: 'center',
          px: 1.1,
          py: 0.75,
          borderRadius: '8px',
          backgroundColor: 'rgba(0,0,0,0.32)',
          backdropFilter: 'blur(8px)',
          transform: { xs: 'translateX(50%)', md: 'none' },
        }}
      >
        {heroImages.map((image, index) => (
          <Box
            key={image}
            onClick={() => setHeroIndex(index)}
            sx={{
              width: heroIndex === index ? 18 : 7,
              height: 7,
              borderRadius: '3px',
              backgroundColor: heroIndex === index ? '#FFFFFF' : 'rgba(255,255,255,0.42)',
              transition: 'width 0.25s ease, background-color 0.25s ease',
              cursor: 'pointer',
              '&:hover': { backgroundColor: '#FFFFFF' },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
