import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { keyframes } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function HeroSection({ scrollToSection, handleBookNow, t }) {
  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: { xs: 'calc(100svh - 60px)', md: 'calc(100svh - 72px)' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        pt: { xs: 2.5, sm: 4, md: 0 },
        pb: { xs: 5, md: 8 },
      }}
    >
      {/* Main content */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, lg: 4 }, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
          gap: { xs: 4, md: 5 },
        }}>
          <Box sx={{
            maxWidth: { xs: 330, sm: 520, md: 650, lg: 720 },
            mr: 'auto',
            textAlign: 'left',
            animation: `${fadeInUp} 0.8s ease-out`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <Chip
              label={t('landing.storyHeroEyebrow')}
              size="small"
              sx={{
                mb: { xs: 2, md: 3 },
                height: { xs: 24, md: 28 },
                px: { xs: 1, md: 1.5 },
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: { xs: '0.64rem', md: '0.8125rem' },
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(10px)',
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.95rem', sm: '2.65rem', md: '4.1rem', lg: '4.35rem' },
                fontWeight: 900,
                lineHeight: { xs: 1.15, md: 1.05 },
                letterSpacing: 0,
                mb: { xs: 2, md: 2.5 },
                color: '#FFFFFF',
                textShadow: '0 10px 40px rgba(0,0,0,0.6)',
                background: 'linear-gradient(to bottom, #FFFFFF 60%, #B3B3B3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('landing.storyHeroTitle')}
              <Box component="span" sx={{ display: 'block', WebkitTextFillColor: 'initial', color: '#FFFFFF' }}>
                {t('landing.storyHeroAccent')}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: { xs: '0.9rem', sm: '1.02rem', md: '1.2rem' },
                mb: { xs: 2.5, md: 4 },
                maxWidth: 620,
                fontWeight: 500,
                lineHeight: 1.6,
                textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              }}
            >
              {t('landing.storyHeroSubtitle')}
            </Typography>
            <Box sx={{ display: 'flex', gap: { xs: 1, md: 1.5 }, flexWrap: 'wrap', justifyContent: 'flex-start', width: '100%' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => scrollToSection('fleet')}
                sx={{
                  borderRadius: '30px',
                  fontWeight: 800,
                  px: { xs: 2.4, sm: 4.5 },
                  py: { xs: 1.05, md: 1.5 },
                  fontSize: { xs: '0.8rem', md: '0.9375rem' },
                  backgroundColor: '#FFFFFF',
                  color: '#0A0A0A',
                  boxShadow: '0 8px 30px rgba(255,255,255,0.15)',
                  '&:hover': { backgroundColor: '#EDEDED', boxShadow: '0 8px 30px rgba(255,255,255,0.3)' },
                }}
              >
                {t('landing.exploreBtn')}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleBookNow}
                sx={{
                  borderRadius: '30px',
                  fontWeight: 800,
                  px: { xs: 2.4, sm: 4.5 },
                  py: { xs: 1.05, md: 1.5 },
                  fontSize: { xs: '0.8rem', md: '0.9375rem' },
                  color: '#FFFFFF',
                  borderColor: 'rgba(255,255,255,0.4)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
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
        </Box>
      </Container>

      {/* Scroll-down indicator */}
      <Box
        onClick={() => scrollToSection('features')}
        sx={{
          position: 'absolute',
          bottom: { xs: 24, md: 34 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          cursor: 'pointer',
          animation: `${bounce} 2s infinite`,
        }}
      >
        <KeyboardArrowDownIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 26 }} />
      </Box>
    </Box>
  );
}
