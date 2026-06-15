import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import { keyframes } from '@mui/material/styles';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { iconFrameSx, landingCardSx } from './styles';

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

export default function Footer({ scrollContainerRef, scrollToSection, t }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const scrollTarget = scrollContainerRef?.current;
    if (!scrollTarget) return undefined;

    const onScroll = () => setShowScrollTop(scrollTarget.scrollTop > 500);
    onScroll();
    scrollTarget.addEventListener('scroll', onScroll, { passive: true });
    return () => scrollTarget.removeEventListener('scroll', onScroll);
  }, [scrollContainerRef]);

  const handleScrollTop = () => {
    const scrollTarget = scrollContainerRef?.current;
    if (scrollTarget) {
      scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Box
        id="footer"
        component="footer"
        sx={{
          minHeight: { xs: 'calc(100svh - 60px)', md: 'calc(100svh - 72px)' },
          py: { xs: 4.5, md: 6 },
          display: 'flex',
          alignItems: 'center',
          mt: 'auto',
          backgroundColor: 'transparent',
          borderTop: '1px solid rgba(255,255,255,0.12)',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
        }}
      >
        <Container maxWidth="lg" sx={{ ...landingCardSx, p: { xs: 1.8, md: 4 }, width: { xs: 'calc(100% - 32px)', sm: 'calc(100% - 48px)', md: '100%' }, mx: 'auto' }}>
          <Grid container spacing={{ xs: 2.25, md: 4 }} sx={{ mb: { xs: 2.5, md: 4 } }}>
            {/* Brand column */}
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
                  component="img"
                  src="/assets/img/srs-logo.png"
                  alt="Smart Rental System"
                  sx={{ width: 36, height: 36, objectFit: 'cover', borderRadius: '50%' }}
                />
              </Box>
              <Typography variant="body2" sx={{ maxWidth: 400, fontSize: { xs: '0.82rem', md: '0.875rem' }, lineHeight: { xs: 1.55, md: 1.7 }, mb: { xs: 2, md: 2.5 }, color: 'rgba(255,255,255,0.7)' }}>
                {t('landing.footerDesc')}
              </Typography>

              {/* Social media icons */}
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, color: '#FFFFFF' }}>
                {t('landing.followUs')}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, idx) => (
                  <Tooltip key={idx} title={social.label} arrow placement="top">
                    <IconButton
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.72)',
                        width: 36,
                        height: 36,
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        '& .MuiSvgIcon-root': { fontSize: 19 },
                        '&:hover': {
                          backgroundColor: '#FFFFFF',
                          color: '#0A0A0A',
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
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, color: '#FFFFFF' }}>
                {t('landing.quickLinks')}
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: '1fr' }, gap: { xs: 1, md: 1.5 } }}>
                {['features', 'how-it-works', 'fleet', 'faq', 'testimonials'].map((sec) => (
                  <Typography
                    key={sec}
                    variant="caption"
                    onClick={() => scrollToSection(sec)}
                    sx={{
                      cursor: 'pointer',
                      color: 'rgba(255,255,255,0.66)',
                      '&:hover': { color: '#FFFFFF' },
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
            <Grid item xs={12} sm={8} md={4}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, color: '#FFFFFF' }}>
                {t('landing.contactUs')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                  <Box sx={iconFrameSx(30, 16)}>
                    <EmailIcon />
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.68)' }}>
                    support@smartrental.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.1 }}>
                  <Box sx={iconFrameSx(30, 16)}>
                    <PhoneIcon />
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.68)' }}>
                    +62 812-3456-7890
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.1 }}>
                  <Box sx={{ ...iconFrameSx(30, 16), mt: 0.1 }}>
                    <LocationOnIcon />
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.68)' }}>
                    Palembang, Sumatera Selatan, Indonesia
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: { xs: 2, md: 3 }, borderColor: 'rgba(255,255,255,0.14)' }} />

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.62)' }}>
              &copy; {new Date().getFullYear()} Smart Rental. {t('landing.rights')}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 600, color: 'rgba(255,255,255,0.62)' }}>
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
              bottom: { xs: 16, md: 28 },
              right: { xs: 16, md: 28 },
              zIndex: 1200,
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              color: '#0A0A0A',
              animation: `${fadeIn} 0.3s ease`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              '&:hover': { backgroundColor: '#EDEDED' },
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
