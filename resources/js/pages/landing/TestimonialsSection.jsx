import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import { iconFrameSx, landingCardSx, landingHeaderSx, landingSectionSx, landingSubtitleSx, landingTitleSx } from './styles';

const dicebearUrl = (seed) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

export default function TestimonialsSection({ t }) {
  const testimonials = [
    {
      name: 'Rian Hidayat',
      role: t('landing.roleEntrepreneur'),
      quote: t('landing.testimonial1Quote'),
      avatar: dicebearUrl('Rian Hidayat'),
    },
    {
      name: 'Dewi Lestari',
      role: t('landing.roleEmployee'),
      quote: t('landing.testimonial2Quote'),
      avatar: dicebearUrl('Dewi Lestari'),
    },
    {
      name: 'Budi Santoso',
      role: t('landing.roleBiker'),
      quote: t('landing.testimonial3Quote'),
      avatar: dicebearUrl('Budi Santoso'),
    },
  ];

  return (
    <Box
      id="testimonials"
      sx={{
        ...landingSectionSx,
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
        <Box sx={landingHeaderSx}>
          <Typography variant="h2" sx={landingTitleSx}>
            {t('landing.testimonialsTitle')}
          </Typography>
          <Typography variant="body1" sx={landingSubtitleSx}>
            {t('landing.testimonialsSubtitle')}
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 1.5, md: 3 }}>
          {testimonials.map((item, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card
                sx={{
                  ...landingCardSx,
                  height: '100%',
                  p: { xs: 1.75, md: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    borderColor: 'rgba(255,255,255,0.3)',
                    boxShadow: '0 24px 70px rgba(0,0,0,0.34)',
                  },
                }}
              >
                <Box>
                  {/* Quote icon accent */}
                  <Box sx={{ ...iconFrameSx(34, 18), mb: 1.25 }}>
                    <FormatQuoteIcon sx={{ transform: 'scaleX(-1)' }} />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} sx={{ color: 'warning.main', fontSize: 17 }} />
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: { xs: '0.82rem', md: '0.875rem' }, lineHeight: { xs: 1.55, md: 1.7 }, color: 'rgba(255,255,255,0.72)', mb: { xs: 2, md: 3 } }}>
                    "{item.quote}"
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
                  <Avatar
                    alt={item.name}
                    src={item.avatar}
                    sx={{
                      width: 44,
                      height: 44,
                      maxWidth: 44,
                      border: `2px solid`,
                      borderColor: 'rgba(255,255,255,0.22)',
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF' }}>{item.name}</Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>{item.role}</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
