import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const dicebearUrl = (seed) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

export default function TestimonialsSection({ isDark, t }) {
  const theme = useTheme();

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
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.paper',
        transition: 'background-color 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle decorative circle */}
      <Box sx={{
        position: 'absolute',
        top: -80,
        right: -80,
        width: 260,
        height: 260,
        borderRadius: '50%',
        background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, mb: 2 }}>
            {t('landing.testimonialsTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
            {t('landing.testimonialsSubtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((item, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card
                sx={{
                  height: '100%',
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 4.5,
                  background: 'background.default',
                  border: `1px solid`,
                  borderColor: 'divider',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'primary.main',
                    boxShadow: isDark ? '0 12px 30px rgba(255,255,255,0.02)' : '0 12px 30px rgba(0,0,0,0.06)',
                  },
                }}
              >
                <Box>
                  {/* Quote icon accent */}
                  <FormatQuoteIcon sx={{
                    fontSize: 32,
                    color: 'action.selected',
                    mb: 1.5,
                    transform: 'scaleX(-1)',
                  }} />

                  <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} fontSize="small" sx={{ color: 'warning.main' }} />
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.7, color: 'text.secondary', mb: 3 }}>
                    "{item.quote}"
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
                  <Avatar
                    alt={item.name}
                    src={item.avatar}
                    sx={{
                      width: 48,
                      height: 48,
                      border: `2px solid`,
                      borderColor: 'divider',
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{item.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.role}</Typography>
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
