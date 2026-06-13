import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/material/styles';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { iconFrameSx } from './styles';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

export default function CtaBanner({ isDark, handleBookNow, t }) {
  return (
    <Box
      sx={{
        py: { xs: 5.5, md: 7 },
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: isDark ? 'background.paper' : 'primary.main',
      }}
    >
      {/* Decorative floating shapes */}
      <Box sx={{
        position: 'absolute',
        top: -40,
        right: '10%',
        width: 96,
        height: 96,
        borderRadius: '50%',
        backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)',
        animation: `${float} 6s ease-in-out infinite`,
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: -20,
        left: '5%',
        width: 64,
        height: 64,
        borderRadius: '50%',
        backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)',
        animation: `${float} 8s ease-in-out infinite 1s`,
        pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute',
        top: '30%',
        right: '25%',
        width: 42,
        height: 42,
        borderRadius: '50%',
        backgroundColor: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.04)',
        animation: `${float} 5s ease-in-out infinite 0.5s`,
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: { xs: 2.5, md: 4 },
          textAlign: 'left',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.75, md: 2.5 } }}>
            <Box sx={{
              ...iconFrameSx(52, 26),
              backgroundColor: isDark ? 'action.selected' : 'rgba(255,255,255,0.16)',
              color: isDark ? 'text.primary' : 'primary.contrastText',
              display: { xs: 'none', sm: 'inline-flex' },
            }}>
              <DirectionsCarIcon />
            </Box>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.65rem', md: '2.2rem' },
                  fontWeight: 900,
                  color: isDark ? 'text.primary' : 'primary.contrastText',
                  mb: 1,
                  lineHeight: 1.2,
                }}
              >
                {t('landing.ctaTitle')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: isDark ? 'text.secondary' : 'rgba(255,255,255,0.75)',
                  fontWeight: 500,
                  maxWidth: { xs: '100%', md: 500 },
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                {t('landing.ctaSubtitle')}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={handleBookNow}
            endIcon={<ArrowForwardIcon />}
            sx={{
              fontWeight: 800,
              px: { xs: 3, md: 4 },
              py: { xs: 1.25, md: 1.45 },
              fontSize: { xs: '0.95rem', md: '1rem' },
              borderRadius: '8px',
              backgroundColor: isDark ? 'primary.main' : 'background.paper',
              color: isDark ? 'primary.contrastText' : 'text.primary',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
              '&:hover': {
                backgroundColor: isDark ? 'primary.light' : '#F0F0F0',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
              },
              whiteSpace: 'nowrap',
            }}
          >
            {t('landing.ctaButton')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
