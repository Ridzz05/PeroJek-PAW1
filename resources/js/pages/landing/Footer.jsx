import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

export default function Footer({ isDark, language, scrollToSection, t }) {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        mt: 'auto',
        backgroundColor: isDark ? '#0A0A0A' : '#FAFAFA',
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <TimeToLeaveIcon sx={{ color: 'primary.main', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 850 }}>
                Smart Rental
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, lineHeight: 1.6, mb: 2 }}>
              {t('landing.footerDesc')}
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
              {t('landing.quickLinks')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {['features', 'fleet', 'testimonials'].map((sec) => (
                <Typography
                  key={sec}
                  variant="caption"
                  onClick={() => scrollToSection(sec)}
                  sx={{
                    cursor: 'pointer',
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s ease',
                    textTransform: 'capitalize',
                    fontWeight: 600
                  }}
                >
                  {sec === 'features' ? t('landing.navFeatures') :
                   sec === 'fleet' ? t('landing.navFleet') :
                   t('landing.navTestimonials')}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
              {t('landing.contactUs')}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
              Email: support@smartrental.com
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
              Phone: +62 812-3456-7890
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
              Address: Palembang, Sumatera Selatan, Indonesia
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            &copy; {new Date().getFullYear()} Smart Rental. {t('landing.rights')}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Made with Google Sans &amp; Material UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
