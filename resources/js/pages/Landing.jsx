import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import CarModelViewer from '../components/CarModelViewer';
import { useLanguage } from '../i18n/i18n';
import { useAuth } from '../auth/AuthContext';
import { apiFetch } from '../utils/api';

import Navbar from './landing/Navbar';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import FleetSection from './landing/FleetSection';
import TestimonialsSection from './landing/TestimonialsSection';
import CtaBanner from './landing/CtaBanner';
import HowItWorksSection from './landing/HowItWorksSection';
import FaqSection from './landing/FaqSection';
import Footer from './landing/Footer';

export default function Landing({ onGoLogin, onGoRegister, setCurrentPage, mode, toggleColorMode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = mode === 'dark';
  const { t, language, toggleLanguage } = useLanguage();
  const { user } = useAuth();
  const landingScrollRef = useRef(null);

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Fetch Fleet Data using shared apiFetch utility
  useEffect(() => {
    apiFetch('/api/vehicles')
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
    const scrollTarget = landingScrollRef.current;
    if (!scrollTarget) return undefined;

    let frameId = 0;

    const updateScrollProgress = () => {
      frameId = 0;
      const maxScroll = Math.max(1, scrollTarget.scrollHeight - scrollTarget.clientHeight);
      const nextProgress = Math.min(1, Math.max(0, scrollTarget.scrollTop / maxScroll));
      setScrollProgress((currentProgress) => (
        Math.abs(currentProgress - nextProgress) < 0.002 ? currentProgress : nextProgress
      ));
    };

    const onScroll = () => {
      if (frameId) cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateScrollProgress);
    };

    updateScrollProgress();
    scrollTarget.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      scrollTarget.removeEventListener('scroll', onScroll);
    };
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
    const scrollTarget = landingScrollRef.current;
    if (!el) return;

    if (scrollTarget?.contains(el)) {
      const navOffset = isMobile ? 60 : 72;
      const maxScroll = Math.max(0, scrollTarget.scrollHeight - scrollTarget.clientHeight);
      const targetTop = Math.min(maxScroll, Math.max(0, el.offsetTop - navOffset));
      scrollTarget.scrollTo({ top: targetTop, behavior: 'smooth' });
      return;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100svh',
        backgroundColor: '#050505',
        color: '#FFFFFF',
        overflow: 'hidden',
        isolation: 'isolate',
      }}
    >
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundColor: '#050505' }}>
        <CarModelViewer
          scrollProgress={scrollProgress}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
          sx={{ position: 'fixed' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: {
              xs: 'radial-gradient(circle at 50% 58%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 34%, rgba(0,0,0,0.66) 74%), linear-gradient(180deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 48%, rgba(0,0,0,0.84) 100%)',
              md: 'radial-gradient(circle at 50% 44%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 30%, rgba(0,0,0,0.72) 72%), linear-gradient(180deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.18) 48%, rgba(0,0,0,0.84) 100%)',
            },
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.12) 48%, rgba(0,0,0,0.62) 100%)',
          }}
        />
      </Box>

      <Box
        ref={landingScrollRef}
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100svh',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollBehavior: 'smooth',
          scrollSnapType: 'y mandatory',
          scrollPaddingTop: { xs: '60px', md: '72px' },
          WebkitOverflowScrolling: 'touch',
          overscrollBehaviorY: 'contain',
          touchAction: 'pan-y',
        }}
      >
        <Navbar
          isMobile={isMobile}
          isDark={isDark}
          language={language}
          toggleLanguage={toggleLanguage}
          toggleColorMode={toggleColorMode}
          user={user}
          onGoLogin={onGoLogin}
          onGoRegister={onGoRegister}
          setCurrentPage={setCurrentPage}
          scrollToSection={scrollToSection}
          t={t}
        />

        <HeroSection
          scrollToSection={scrollToSection}
          handleBookNow={handleBookNow}
          t={t}
        />

        <FeaturesSection t={t} />

        <HowItWorksSection t={t} />

        <FleetSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
          loading={loading}
          filteredVehicles={filteredVehicles}
          handleBookNow={handleBookNow}
          t={t}
        />

        <CtaBanner handleBookNow={handleBookNow} t={t} />

        <TestimonialsSection t={t} />

        <FaqSection t={t} />

        <Footer
          scrollContainerRef={landingScrollRef}
          scrollToSection={scrollToSection}
          t={t}
        />
      </Box>
    </Box>
  );
}
