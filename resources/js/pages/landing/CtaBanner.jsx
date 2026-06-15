import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { iconFrameSx, landingCardSx } from './styles';

export default function CtaBanner({ handleBookNow, t }) {
  return (
    <Box
      id="cta"
      sx={{
        minHeight: { xs: 'calc(100svh - 60px)', md: 'calc(100svh - 72px)' },
        py: { xs: 4.5, md: 7 },
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
        <Box sx={{
          ...landingCardSx,
          p: { xs: 1.9, md: 4 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: { xs: 2, md: 4 },
          textAlign: 'left',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.75, md: 2.5 } }}>
            <Box sx={{
              ...iconFrameSx(52, 26),
              display: { xs: 'none', sm: 'inline-flex' },
            }}>
              <DirectionsCarIcon />
            </Box>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.45rem', md: '2.2rem' },
                  fontWeight: 900,
                  color: '#FFFFFF',
                  mb: 1,
                  lineHeight: 1.2,
                  textShadow: { xs: '0 2px 8px rgba(0,0,0,0.9)', md: 'none' },
                }}
              >
                {t('landing.ctaTitle')}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: { xs: 'rgba(255,255,255,0.88)', md: 'rgba(255,255,255,0.72)' },
                  fontWeight: 500,
                  maxWidth: { xs: '100%', md: 500 },
                  fontSize: { xs: '0.84rem', md: '1rem' },
                  lineHeight: { xs: 1.55, md: 1.65 },
                  textShadow: { xs: '0 1px 3px rgba(0,0,0,0.8)', md: 'none' },
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
              width: { xs: '100%', md: 'auto' },
              fontSize: { xs: '0.9rem', md: '1rem' },
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              color: '#0A0A0A',
              boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
              '&:hover': {
                backgroundColor: '#EDEDED',
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
