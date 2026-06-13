import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import { useTheme, keyframes } from '@mui/material/styles';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { iconFrameSx } from './styles';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;

const socialLinks = [
  { icon: <InstagramIcon />, label: 'Instagram' },
  { icon: <FacebookIcon />, label: 'Facebook' },
  { icon: <TwitterIcon />, label: 'Twitter' },
  { icon: <YouTubeIcon />, label: 'YouTube' },
];

export default function Footer({ scrollToSection, t }) {
  const theme = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Box
        component="footer"
        sx={{
          py: { xs: 5, md: 6 },
          mt: 'auto',
          backgroundColor: 'background.default',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {/* Brand column */}
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
                  component="img"
                  src="/assets/img/srs-logo.png"
                  alt="Smart Rental System"
                  sx={{ width: 36, height: 36, objectFit: 'contain', borderRadius: '8px' }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, lineHeight: 1.7, mb: 2.5 }}>
                {t('landing.footerDesc')}
              </Typography>

              {/* Social media icons */}
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5 }}>
                {t('landing.followUs')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, idx) => (
                  <Tooltip key={idx} title={social.label} arrow placement="top">
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: 'action.hover',
                        color: 'text.secondary',
                        width: 36,
                        height: 36,
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        '& .MuiSvgIcon-root': { fontSize: 19 },
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'primary.contrastText',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={6} sm={4} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
                {t('landing.quickLinks')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {['features', 'how-it-works', 'fleet', 'faq', 'testimonials'].map((sec) => (
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
                     sec === 'how-it-works' ? t('landing.navHowItWorks') :
                     sec === 'fleet' ? t('landing.navFleet') :
                     sec === 'faq' ? t('landing.navFaq') :
                     t('landing.navTestimonials')}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={6} sm={8} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
                {t('landing.contactUs')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                  <Box sx={{ ...iconFrameSx(30, 16), color: 'text.secondary' }}>
                    <EmailIcon />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    support@smartrental.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                  <Box sx={{ ...iconFrameSx(30, 16), color: 'text.secondary' }}>
                    <PhoneIcon />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    +62 812-3456-7890
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.1 }}>
                  <Box sx={{ ...iconFrameSx(30, 16), color: 'text.secondary', mt: 0.1 }}>
                    <LocationOnIcon />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Palembang, Sumatera Selatan, Indonesia
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              &copy; {new Date().getFullYear()} Smart Rental. {t('landing.rights')}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Made with Google Sans &amp; Material UI
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Scroll to Top FAB */}
      {showScrollTop && (
        <Tooltip title={t('landing.backToTop')} arrow placement="left">
          <Fab
            color="primary"
            size="medium"
            onClick={handleScrollTop}
            sx={{
              position: 'fixed',
              bottom: { xs: 20, md: 28 },
              right: { xs: 20, md: 28 },
              zIndex: 1200,
              borderRadius: '8px',
              animation: `${fadeIn} 0.3s ease`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              '& .MuiSvgIcon-root': { fontSize: 22 },
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Tooltip>
      )}
    </>
  );
}
