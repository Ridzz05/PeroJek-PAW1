import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Icons
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SecurityIcon from '@mui/icons-material/Security';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PaidIcon from '@mui/icons-material/Paid';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

import { useLanguage } from '../i18n/i18n';
import { useAuth } from '../auth/AuthContext';

const heroImages = [
  '/assets/img/1.jpg',
  '/assets/img/2.jpg',
  '/assets/img/3.jpg',
  '/assets/img/4.jpg',
];

export default function Landing({ onGoLogin, onGoRegister, setCurrentPage, mode, toggleColorMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = mode === 'dark';
  const { t, language, toggleLanguage } = useLanguage();
  const { user } = useAuth();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);

  // Fetch Fleet Data
  useEffect(() => {
    fetch('/api/vehicles', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(async res => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setVehicles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading vehicles:', err);
        setVehicles([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % heroImages.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  // Filter Categories
  const categories = ['All', ...new Set(vehicles.map(v => v.category?.name).filter(Boolean))];

  const filteredVehicles = vehicles.filter(v => {
    const matchesCategory = selectedCategory === 'All' || v.category?.name === selectedCategory;
    const matchesSearch = `${v.brand} ${v.model}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNow = () => {
    if (user) {
      if (setCurrentPage) {
        setCurrentPage('rental-desk');
      }
    } else {
      onGoLogin();
    }
  };

  // Translations dictionary for Landing Page to avoid modifying translation.json directly
  const text = {
    eng: {
      tagline: 'Premium Fleet, Seamless Rental',
      titleHighlight: 'Berkendara Tanpa Batas,',
      titleRest: ' Sewa Tanpa Ribet',
      subtitle: 'Smart Rental offers the best selection of modern vehicles with simple booking, transparent rates, and premium service to elevate your journeys.',
      exploreBtn: 'Explore Fleet',
      startBtn: 'Get Started',
      featuresTitle: 'Why Choose Smart Rental?',
      featuresSubtitle: 'We deliver top-notch rental experience with advanced features and unparalleled comfort.',
      feature1Title: 'Pristine Maintenance',
      feature1Desc: 'All vehicles undergo rigorous safety and sanitation checks before every single booking.',
      feature2Title: 'Lightning Instant Booking',
      feature2Desc: 'Skip the line. Book in under 3 minutes with zero administrative hassle.',
      feature24Title: '24/7 Road Support',
      feature24Desc: 'Our dedicated support team and roadside assistance are always active for your peace of mind.',
      feature3Title: 'Best Daily Rates',
      feature3Desc: 'Premium fleet at highly competitive pricing with zero hidden insurance fees.',
      fleetTitle: 'Our Premium Fleet Catalog',
      fleetSubtitle: 'Browse our diverse fleet of SUVs, MPVs, City Cars, and Motorcycles ready for your next destination.',
      searchPlaceholder: 'Search vehicle...',
      daily: 'day',
      rentNow: 'Rent Now',
      available: 'Available',
      rented: 'Rented',
      maintenance: 'Maintenance',
      testimonialsTitle: 'Loved by Thousands of Drivers',
      testimonialsSubtitle: 'Here is what our valuable clients say about their driving experience with us.',
      footerDesc: 'Smart Rental is a state-of-the-art vehicle management and booking system designed for ultimate convenience and modern mobility.',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      rights: 'All rights reserved.',
      viewDashboard: 'Go to Dashboard',
      login: 'Sign In',
      register: 'Register'
    },
    id: {
      tagline: 'Armada Premium, Sewa Instan',
      titleHighlight: 'Berkendara Tanpa Batas,',
      titleRest: ' Sewa Tanpa Ribet',
      subtitle: 'Smart Rental menawarkan pilihan kendaraan modern terbaik dengan proses pemesanan mudah, tarif transparan, dan layanan premium untuk setiap perjalanan Anda.',
      exploreBtn: 'Lihat Armada',
      startBtn: 'Mulai Sekarang',
      featuresTitle: 'Mengapa Memilih Smart Rental?',
      featuresSubtitle: 'Kami memberikan pengalaman sewa terbaik dengan fitur canggih dan kenyamanan tanpa kompromi.',
      feature1Title: 'Perawatan Berkala Prima',
      feature1Desc: 'Semua kendaraan menjalani pemeriksaan keamanan dan kebersihan ketat sebelum disewakan.',
      feature2Title: 'Pemesanan Kilat Instan',
      feature2Desc: 'Tanpa antre. Pesan kendaraan dalam waktu kurang dari 3 menit tanpa syarat berbelit.',
      feature24Title: 'Dukungan Jalan 24/7',
      feature24Desc: 'Tim support kami dan bantuan darurat di jalan selalu siaga menemani perjalanan Anda.',
      feature3Title: 'Tarif Sewa Terbaik',
      feature3Desc: 'Kendaraan premium dengan harga bersaing tanpa ada tambahan biaya tersembunyi.',
      fleetTitle: 'Katalog Armada Premium',
      fleetSubtitle: 'Temukan berbagai pilihan SUV, MPV, City Car, dan Motor yang siap menemani rute perjalanan Anda.',
      searchPlaceholder: 'Cari kendaraan...',
      daily: 'hari',
      rentNow: 'Sewa Sekarang',
      available: 'Tersedia',
      rented: 'Sedang Sewa',
      maintenance: 'Perawatan',
      testimonialsTitle: 'Dicintai oleh Ribuan Pengemudi',
      testimonialsSubtitle: 'Apa kata pelanggan setia kami tentang kenyamanan berkendara bersama Smart Rental.',
      footerDesc: 'Smart Rental adalah sistem manajemen dan pemesanan kendaraan modern yang dirancang untuk kenyamanan maksimal dan mobilitas masa kini.',
      quickLinks: 'Tautan Cepat',
      contactUs: 'Hubungi Kami',
      rights: 'Hak cipta dilindungi undang-undang.',
      viewDashboard: 'Ke Dasbor',
      login: 'Masuk',
      register: 'Daftar'
    }
  };

  const activeText = text[language] || text.eng;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'background.default', overflowX: 'hidden' }}>
      
      {/* ─── NAVBAR ──────────────────────────────────────────────────────────── */}
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
                    {sec === 'features' ? (language === 'eng' ? 'Features' : 'Fitur') : 
                     sec === 'fleet' ? (language === 'eng' ? 'Fleet' : 'Armada') : 
                     (language === 'eng' ? 'Testimonials' : 'Testimoni')}
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
                  onClick={() => setCurrentPage ? setCurrentPage('dashboard') : handleBookNow()}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    px: { xs: 1.5, md: 3 },
                    py: { xs: 0.6, md: 1 }
                  }}
                >
                  {activeText.viewDashboard}
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
                    {activeText.login}
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
                    {activeText.register}
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ─── HERO SECTION ────────────────────────────────────────────────────── */}
      <Box
        id="hero"
        sx={{
          position: 'relative',
          minHeight: { xs: 'calc(100svh - 112px)', md: 'calc(100svh - 120px)' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          color: '#FFFFFF',
          py: { xs: 7, md: 8 },
        }}
      >
        {heroImages.map((image, index) => (
          <Box
            key={image}
            component="img"
            src={image}
            alt={`Smart Rental hero vehicle ${index + 1}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: { xs: '62% center', md: 'center center' },
              opacity: heroIndex === index ? 1 : 0,
              transform: heroIndex === index ? 'scale(1)' : 'scale(1.035)',
              transition: 'opacity 900ms ease, transform 4200ms ease',
              zIndex: 0,
            }}
          />
        ))}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: {
              xs: 'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 56%, rgba(0,0,0,0.22) 100%)',
              md: 'linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.56) 38%, rgba(0,0,0,0.14) 74%, rgba(0,0,0,0.04) 100%)',
            },
            pointerEvents: 'none',
          }}
        />
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, lg: 4 } }}>
          <Box sx={{ maxWidth: { xs: 620, md: 640 } }}>
            <Chip
              label={activeText.tagline}
              size="small"
              sx={{
                mb: 3,
                height: 28,
                px: 0.5,
                color: '#FFFFFF',
                fontWeight: 800,
                backgroundColor: 'rgba(255,255,255,0.16)',
                border: '1px solid rgba(255,255,255,0.28)',
                backdropFilter: 'blur(10px)',
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.6rem' },
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: 0,
                mb: 2.5,
                color: '#FFFFFF',
                textShadow: '0 12px 40px rgba(0,0,0,0.45)',
              }}
            >
              {activeText.titleHighlight}
              {activeText.titleRest}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.82)',
                fontSize: { xs: '1rem', md: '1.15rem' },
                mb: 4,
                maxWidth: 600,
                fontWeight: 500,
                lineHeight: 1.65,
                textShadow: '0 8px 28px rgba(0,0,0,0.42)',
              }}
            >
              {activeText.subtitle}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => scrollToSection('fleet')}
                sx={{
                  borderRadius: 2,
                  fontWeight: 800,
                  px: { xs: 3, sm: 4 },
                  py: 1.4,
                  backgroundColor: '#FFFFFF',
                  color: '#0A0A0A',
                  '&:hover': { backgroundColor: '#EDEDED' },
                }}
              >
                {activeText.exploreBtn}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleBookNow}
                sx={{
                  borderRadius: 2,
                  fontWeight: 800,
                  px: { xs: 3, sm: 4 },
                  py: 1.4,
                  color: '#FFFFFF',
                  borderColor: 'rgba(255,255,255,0.7)',
                  backgroundColor: 'rgba(0,0,0,0.16)',
                  backdropFilter: 'blur(8px)',
                  '&:hover': {
                    borderColor: '#FFFFFF',
                    backgroundColor: 'rgba(255,255,255,0.12)',
                  },
                }}
              >
                {activeText.startBtn}
              </Button>
            </Box>
          </Box>
        </Container>
        <Box
          sx={{
            position: 'absolute',
            right: { xs: 16, md: 28 },
            bottom: { xs: 14, md: 18 },
            zIndex: 1,
            display: 'flex',
            gap: 0.75,
            alignItems: 'center',
            px: 1.1,
            py: 0.75,
            borderRadius: 999,
            backgroundColor: 'rgba(0,0,0,0.32)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {heroImages.map((image, index) => (
            <Box
              key={image}
              sx={{
                width: heroIndex === index ? 18 : 7,
                height: 7,
                borderRadius: 999,
                backgroundColor: heroIndex === index ? '#FFFFFF' : 'rgba(255,255,255,0.42)',
                transition: 'width 0.25s ease, background-color 0.25s ease',
              }}
            />
          ))}
        </Box>
      </Box>

      {/* ─── FEATURES SECTION ────────────────────────────────────────────────── */}
      <Box
        id="features"
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: isDark ? '#080808' : '#FAF9F6',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, mb: 2 }}>
              {activeText.featuresTitle}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
              {activeText.featuresSubtitle}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <SecurityIcon fontSize="large" sx={{ color: isDark ? '#FFF' : '#0A0A0A' }} />,
                title: activeText.feature1Title,
                desc: activeText.feature1Desc
              },
              {
                icon: <FlashOnIcon fontSize="large" sx={{ color: isDark ? '#FFF' : '#0A0A0A' }} />,
                title: activeText.feature2Title,
                desc: activeText.feature2Desc
              },
              {
                icon: <DirectionsCarIcon fontSize="large" sx={{ color: isDark ? '#FFF' : '#0A0A0A' }} />,
                title: activeText.feature24Title,
                desc: activeText.feature24Desc
              },
              {
                icon: <PaidIcon fontSize="large" sx={{ color: isDark ? '#FFF' : '#0A0A0A' }} />,
                title: activeText.feature3Title,
                desc: activeText.feature3Desc
              }
            ].map((feature, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  sx={{
                    height: '100%',
                    p: 2,
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    background: isDark ? '#141414' : '#FFFFFF',
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      borderColor: 'primary.main',
                      boxShadow: isDark ? '0 12px 30px rgba(255,255,255,0.02)' : '0 12px 30px rgba(0,0,0,0.04)',
                    }
                  }}
                >
              <Box sx={{ p: 1.5, borderRadius: 3, backgroundColor: isDark ? '#1F1F1F' : '#F5F5F3', mb: 2.5 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, fontSize: '1.05rem' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {feature.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ─── FLEET SECTION ───────────────────────────────────────────────────── */}
      <Box id="fleet" sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, mb: 2 }}>
              {activeText.fleetTitle}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', mb: 4, fontWeight: 500 }}>
              {activeText.fleetSubtitle}
            </Typography>

            {/* Filter Search */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', alignItems: 'center', maxWidth: 700, mx: 'auto', mb: 4 }}>
              <TextField
                placeholder={activeText.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 3, background: isDark ? '#141414' : '#FFF' }
                }}
              />
            </Box>

            {/* Category Tabs */}
            {categories.length > 1 && (
              <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', mb: 4 }}>
                <Tabs
                  value={selectedCategory}
                  onChange={(e, val) => setSelectedCategory(val)}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    '& .MuiTabs-indicator': { backgroundColor: 'primary.main', height: 3 },
                    '& .MuiTab-root': { fontWeight: 700, px: 3, textTransform: 'uppercase', letterSpacing: 0.5 }
                  }}
                >
                  {categories.map((cat) => (
                    <Tab key={cat} label={cat === 'All' ? (language === 'eng' ? 'All Vehicles' : 'Semua') : cat} value={cat} />
                  ))}
                </Tabs>
              </Box>
            )}
          </Box>

          {/* Loader or Vehicle Cards Grid */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredVehicles.map((vehicle) => {
                const isAvail = vehicle.status === 'Available';
                const statusLabel = 
                  vehicle.status === 'Available' ? activeText.available : 
                  vehicle.status === 'Rented' ? activeText.rented : activeText.maintenance;
                
                let badgeColor = 'error';
                if (isAvail) badgeColor = 'success';
                else if (vehicle.status === 'Rented') badgeColor = 'warning';

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 4.5,
                        overflow: 'hidden',
                        boxShadow: 'none',
                        border: `1px solid ${theme.palette.divider}`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          boxShadow: isDark ? '0 15px 30px rgba(0,0,0,0.6)' : '0 15px 30px rgba(0,0,0,0.06)',
                          borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={vehicle.image_url || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'}
                          alt={vehicle.model}
                          sx={{ transition: 'transform 0.5s ease', '&:hover': { transform: 'scale(1.05)' } }}
                        />
                        <Chip
                          label={statusLabel}
                          size="small"
                          color={badgeColor}
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            fontWeight: 800,
                            fontSize: '0.7rem',
                            textTransform: 'uppercase',
                            backdropFilter: 'blur(8px)',
                            background: isAvail ? 'rgba(34,197,94,0.9)' : undefined
                          }}
                        />
                      </Box>

                      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          {vehicle.category?.name || 'VEHICLE'}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, mt: 0.5, lineHeight: 1.2 }}>
                          {vehicle.brand} {vehicle.model}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontWeight: 600 }}>
                          No: {vehicle.license_plate}
                        </Typography>

                        <Box sx={{ mt: 'auto' }}>
                          <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main' }}>
                              Rp {Number(vehicle.daily_rate).toLocaleString('id-ID')}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, fontWeight: 700 }}>
                              / {activeText.daily}
                            </Typography>
                          </Box>

                          <Button
                            variant={isAvail ? 'contained' : 'outlined'}
                            fullWidth
                            disabled={!isAvail}
                            onClick={handleBookNow}
                            endIcon={<KeyboardArrowRightIcon />}
                            sx={{
                              borderRadius: 2.5,
                              fontWeight: 700,
                              py: 1,
                              textTransform: 'none'
                            }}
                          >
                            {activeText.rentNow}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Box>

      {/* ─── TESTIMONIALS SECTION ────────────────────────────────────────────── */}
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
              {activeText.testimonialsTitle}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
              {activeText.testimonialsSubtitle}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                name: 'Rian Hidayat',
                role: 'Wirausaha',
                quote: language === 'eng' 
                  ? 'Excellent interface, exceptionally maintained cars. Booking Innova Zenix was quick and the vehicle was pristine.'
                  : 'Layanan luar biasa, mobil sangat bersih dan terawat. Pemesanan Innova Zenix sangat cepat dan mobil dalam kondisi prima.',
                avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              },
              {
                name: 'Dewi Lestari',
                role: 'Karyawan Swasta',
                quote: language === 'eng'
                  ? 'Highly recommended. Rental desk made pickup so simple. Toggling languages is seamless.'
                  : 'Sangat direkomendasikan. Pengambilan mobil di meja penyewaan sangat praktis. Sistem bahasanya juga sangat lancar.',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              },
              {
                name: 'Budi Santoso',
                role: 'Pecinta Motor',
                quote: language === 'eng'
                  ? 'NMAX ride was phenomenal. Cheap daily rate, transparent, and direct service. Will book again!'
                  : 'Pengalaman berkendara NMAX sangat memuaskan. Tarif harian murah, transparan, dan pelayanan langsung. Pasti sewa lagi!',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              }
            ].map((item, idx) => (
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

      {/* ─── FOOTER SECTION ──────────────────────────────────────────────────── */}
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
                {activeText.footerDesc}
              </Typography>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
                {activeText.quickLinks}
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
                    {sec === 'features' ? (language === 'eng' ? 'Features' : 'Fitur') : 
                     sec === 'fleet' ? (language === 'eng' ? 'Fleet' : 'Armada') : 
                     (language === 'eng' ? 'Testimonials' : 'Testimoni')}
                  </Typography>
                ))}
              </Box>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2 }}>
                {activeText.contactUs}
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
              &copy; {new Date().getFullYear()} Smart Rental. {activeText.rights}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
              Made with Google Sans &amp; Material UI
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
