import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { useLanguage } from '../i18n/i18n';
import { useAuth } from '../auth/AuthContext';

import Navbar from './landing/Navbar';
import HeroSection from './landing/HeroSection';
import FeaturesSection from './landing/FeaturesSection';
import FleetSection from './landing/FleetSection';
import TestimonialsSection from './landing/TestimonialsSection';
import CtaBanner from './landing/CtaBanner';
import Footer from './landing/Footer';

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

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'background.default', overflowX: 'hidden' }}>
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
        heroImages={heroImages}
        heroIndex={heroIndex}
        scrollToSection={scrollToSection}
        handleBookNow={handleBookNow}
        t={t}
      />

      <FeaturesSection isDark={isDark} t={t} />

      <FleetSection
        isDark={isDark}
        language={language}
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

      <CtaBanner isDark={isDark} handleBookNow={handleBookNow} t={t} />

      <TestimonialsSection isDark={isDark} t={t} />

      <Footer
        isDark={isDark}
        language={language}
        scrollToSection={scrollToSection}
        t={t}
      />
    </Box>
  );
}
