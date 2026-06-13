import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import WidgetsIcon from '@mui/icons-material/Widgets';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ReviewsIcon from '@mui/icons-material/Reviews';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { iconFrameSx } from './styles';

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navSections = [
    { id: 'hero', label: t('landing.navHome'), icon: <HomeIcon /> },
    { id: 'features', label: t('landing.navFeatures'), icon: <WidgetsIcon /> },
    { id: 'how-it-works', label: t('landing.navHowItWorks'), icon: <AltRouteIcon /> },
    { id: 'fleet', label: t('landing.navFleet'), icon: <DirectionsCarIcon /> },
    { id: 'testimonials', label: t('landing.navTestimonials'), icon: <ReviewsIcon /> },
    { id: 'faq', label: t('landing.navFaq'), icon: <HelpOutlineIcon /> },
  ];

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setDrawerOpen(false);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          width: '100%',
          backgroundColor: isDark ? 'rgba(13, 13, 13, 0.85)' : 'rgba(242, 242, 240, 0.85)',
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
              <Box
                component="img"
                src="/assets/img/srs-logo.png"
                alt="Smart Rental System"
                sx={{ width: { xs: 34, md: 40 }, height: { xs: 34, md: 40 }, objectFit: 'contain', borderRadius: '8px' }}
              />
            </Box>

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 4 }}>
                {navSections.filter(s => s.id !== 'hero').map((sec) => (
                  <Typography
                    key={sec.id}
                    variant="body2"
                    onClick={() => scrollToSection(sec.id)}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      color: 'text.secondary',
                      '&:hover': { color: 'primary.main' },
                      transition: 'color 0.2s ease',
                      textTransform: 'capitalize'
                    }}
                  >
                    {sec.label}
                  </Typography>
                ))}
              </Box>
            )}

            {/* Right Buttons: Theme, Language, Auth CTA */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 } }}>
              {/* Mobile hamburger */}
              {isMobile && (
                <IconButton onClick={() => setDrawerOpen(true)} size="small" color="inherit" sx={{ width: 36, height: 36, borderRadius: '8px', mr: 0.5 }}>
                  <MenuIcon sx={{ fontSize: 21 }} />
                </IconButton>
              )}

              {/* Language Toggle */}
              <IconButton onClick={toggleLanguage} size="small" color="inherit" sx={{ height: 36, borderRadius: '8px' }}>
                <LanguageIcon fontSize="small" />
                <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 700, display: { xs: 'none', sm: 'inline' } }}>
                  {language.toUpperCase()}
                </Typography>
              </IconButton>

              {/* Theme Toggle */}
              <IconButton onClick={toggleColorMode} size="small" color="inherit" sx={{ width: 36, height: 36, borderRadius: '8px' }}>
                {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>

              {/* CTA Action */}
              {user ? (
                <Button
                  variant="contained"
                  size={isMobile ? 'small' : 'medium'}
                  onClick={() => setCurrentPage ? setCurrentPage('dashboard') : null}
                  sx={{
                    borderRadius: '8px',
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
                      borderRadius: '8px',
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

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'background.paper',
            borderRight: `1px solid`,
            borderColor: 'divider',
          }
        }}
      >
        {/* Drawer Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, minHeight: 60 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              component="img"
              src="/assets/img/srs-logo.png"
              alt="Smart Rental System"
              sx={{ width: 34, height: 34, objectFit: 'contain', borderRadius: '8px' }}
            />
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} size="small" sx={{ width: 36, height: 36, borderRadius: '8px' }}>
            <CloseIcon sx={{ fontSize: 21 }} />
          </IconButton>
        </Box>

        <Divider />

        {/* Nav Links */}
        <List sx={{ px: 1, py: 1 }}>
          {navSections.map((sec) => (
            <ListItem key={sec.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavClick(sec.id)}
                sx={{
                  borderRadius: '8px',
                  gap: 1.25,
                  py: 1,
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <Box sx={iconFrameSx(36, 19)}>
                  {sec.icon}
                </Box>
                <ListItemText
                  primary={sec.label}
                  primaryTypographyProps={{ fontWeight: 700, fontSize: '0.95rem' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2 }} />

        {/* Auth actions in drawer for mobile */}
        {!user && (
          <Box sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button variant="text" fullWidth onClick={() => { onGoLogin(); setDrawerOpen(false); }} sx={{ fontWeight: 700, justifyContent: 'flex-start' }}>
              {t('landing.login')}
            </Button>
            <Button variant="contained" fullWidth onClick={() => { onGoRegister(); setDrawerOpen(false); }} sx={{ borderRadius: '8px', fontWeight: 700 }}>
              {t('landing.register')}
            </Button>
          </Box>
        )}
      </Drawer>
    </>
  );
}
