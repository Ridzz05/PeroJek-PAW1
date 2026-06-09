import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

export default function Navbar({
  isMobile,
  isDark,
  language,
  toggleLanguage,
  toggleColorMode,
  user,
  onGoLogin,
  onGoRegister,
  setCurrentPage,
  scrollToSection,
  t,
}) {
  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        width: '100%',
        backgroundColor: isDark ? 'rgba(13, 13, 13, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'background-color 0.3s ease',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, lg: 4 } }}>
        <Box sx={{ height: { xs: 60, md: 72 }, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, cursor: 'pointer' }} onClick={() => scrollToSection('hero')}>
            <TimeToLeaveIcon sx={{ color: 'primary.main', fontSize: { xs: 26, md: 30 } }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Google Sans", sans-serif',
                fontWeight: 850,
                fontSize: { xs: '1.1rem', md: '1.4rem' },
                letterSpacing: '-0.02em',
                color: 'text.primary',
              }}
            >
              Smart Rental
            </Typography>
          </Box>

          {/* Desktop Navigation Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {['features', 'fleet', 'testimonials'].map((sec) => (
                <Typography
                  key={sec}
                  variant="body2"
                  onClick={() => scrollToSection(sec)}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s ease',
                    textTransform: 'capitalize'
                  }}
                >
                  {sec === 'features' ? t('landing.navFeatures') :
                   sec === 'fleet' ? t('landing.navFleet') :
                   t('landing.navTestimonials')}
                </Typography>
              ))}
            </Box>
          )}

          {/* Right Buttons: Theme, Language, Auth CTA */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 } }}>
            {/* Language Toggle */}
            <IconButton onClick={toggleLanguage} size="small" color="inherit">
              <LanguageIcon fontSize="small" />
              <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 700, display: { xs: 'none', sm: 'inline' } }}>
                {language.toUpperCase()}
              </Typography>
            </IconButton>

            {/* Theme Toggle */}
            <IconButton onClick={toggleColorMode} size="small" color="inherit">
              {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </IconButton>

            {/* CTA Action */}
            {user ? (
              <Button
                variant="contained"
                size={isMobile ? 'small' : 'medium'}
                onClick={() => setCurrentPage ? setCurrentPage('dashboard') : null}
                sx={{
                  borderRadius: 2,
                  fontWeight: 700,
                  px: { xs: 1.5, md: 3 },
                  py: { xs: 0.6, md: 1 }
                }}
              >
                {t('landing.viewDashboard')}
              </Button>
            ) : (
              <>
                <Button
                  variant="text"
                  size={isMobile ? 'small' : 'medium'}
                  onClick={onGoLogin}
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    display: { xs: 'none', sm: 'inline-flex' }
                  }}
                >
                  {t('landing.login')}
                </Button>
                <Button
                  variant="contained"
                  size={isMobile ? 'small' : 'medium'}
                  onClick={onGoRegister}
                  sx={{
                    borderRadius: 2.5,
                    fontWeight: 700,
                    px: { xs: 1.8, md: 3 },
                    py: { xs: 0.7, md: 1 }
                  }}
                >
                  {t('landing.register')}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
