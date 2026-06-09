import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

export default function TestimonialsSection({ isDark, t }) {
  const theme = useTheme();

  const testimonials = [
    {
      name: 'Rian Hidayat',
      role: t('landing.roleEntrepreneur'),
      quote: t('landing.testimonial1Quote'),
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Dewi Lestari',
      role: t('landing.roleEmployee'),
      quote: t('landing.testimonial2Quote'),
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      name: 'Budi Santoso',
      role: t('landing.roleBiker'),
      quote: t('landing.testimonial3Quote'),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  return (
    <Box
      id="testimonials"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: isDark ? '#080808' : '#FAF9F6',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
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
                  p: 3,
                  borderRadius: 4.5,
                  background: isDark ? '#141414' : '#FFFFFF',
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} fontSize="small" sx={{ color: 'warning.main' }} />
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.7, color: 'text.secondary', mb: 3 }}>
                    "{item.quote}"
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar alt={item.name} src={item.avatar} sx={{ width: 44, height: 44 }} />
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
