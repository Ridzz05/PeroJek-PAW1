import React, { lazy, Suspense, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { useLanguage } from '../i18n/i18n';
import { useAuth } from '../auth/AuthContext';
import { UKFlagIcon, IDFlagIcon } from './icons/FlagIcons';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'; // Rental Desk
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'; // Rentals
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'; // Fleet
import PeopleIcon from '@mui/icons-material/People'; // Customers
import StorageIcon from '@mui/icons-material/Storage'; // Master Data
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';

const SettingsModal = lazy(() => import('../auth/SettingsModal'));

const drawerWidth = 260;

export default function Layout({ children, currentPage, setCurrentPage, mode, toggleColorMode }) {
  const theme = useTheme();
  const isDark = mode === 'dark';

  const { t, language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();

  // Profile dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const profileOpen = Boolean(anchorEl);
  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
  };

  const handleSettings = () => {
    handleMenuClose();
    setSettingsOpen(true);
  };

  const menuItems = [
    { text: t('menu.dashboard'), short: language === 'eng' ? 'Home' : 'Dasbor', id: 'dashboard', icon: <DashboardIcon /> },
    { text: t('menu.rental_desk'), short: language === 'eng' ? 'Desk' : 'Meja', id: 'rental-desk', icon: <AppRegistrationIcon /> },
    { text: t('menu.rentals'), short: language === 'eng' ? 'Logs' : 'Log', id: 'rentals', icon: <ReceiptLongIcon /> },
    { text: t('menu.fleet'), short: language === 'eng' ? 'Fleet' : 'Armada', id: 'fleet', icon: <DirectionsCarIcon /> },
    { text: t('menu.customers'), short: language === 'eng' ? 'Cust' : 'Klien', id: 'customers', icon: <PeopleIcon /> },
    { text: t('menu.master_data'), short: 'Master', id: 'master-data', icon: <StorageIcon /> },
  ];

  const mobileMenuItems = menuItems.filter((item) =>
    ['rental-desk', 'rentals', 'fleet', 'customers'].includes(item.id)
  );

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Brand Logo Header */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: isDark ? '#141414' : '#FFFFFF',
        borderBottom: `1px solid ${isDark ? '#2A2A2A' : '#E5E5E5'}`,
      }}>
        <Box
          component="img"
          src="/assets/img/srs-logo.png"
          alt="Smart Rental System"
          sx={{ width: 52, height: 52, objectFit: 'cover', borderRadius: '50%' }}
        />
      </Box>
      <Divider />

      {/* Nav List */}
      <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const active = currentPage === item.id;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  setCurrentPage(item.id);
                }}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  px: 2,
                  backgroundColor: active ? (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)') : 'transparent',
                  color: active ? (isDark ? '#FFFFFF' : '#0A0A0A') : theme.palette.text.secondary,
                  fontWeight: active ? 700 : 400,
                  '&:hover': {
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    color: isDark ? '#FFFFFF' : '#0A0A0A',
                  },
                  transition: 'all 0.15s ease',
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 40, 
                  color: active ? (isDark ? '#FFFFFF' : '#0A0A0A') : theme.palette.text.secondary,
                  transition: 'all 0.15s ease',
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: '0.925rem', 
                    fontWeight: active ? 700 : 500,
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />

      {/* Sidebar Footer spacer */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src={user?.profile_picture || undefined}
            alt={user?.name || 'U'}
            sx={{ width: 36, height: 36, fontSize: 14, fontWeight: 700, border: `2px solid ${theme.palette.primary.main}` }}
          >
            {!user?.profile_picture && (user?.name?.[0]?.toUpperCase() || 'U')}
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 600 }}>
              {user?.name || 'User'}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
              {user?.role || 'staff'}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Top Navbar Header */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" noWrap component="div" sx={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 700, fontSize: '1.25rem' }}>
              {menuItems.find(item => item.id === currentPage)?.text || 'Smart Rental'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton onClick={toggleLanguage} color="inherit" sx={{ p: 0.5 }}>
              {language === 'eng' ? <UKFlagIcon /> : <IDFlagIcon />}
            </IconButton>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Divider orientation="vertical" variant="middle" flexItem />

            {/* Profile Avatar + Dropdown */}
            <IconButton onClick={handleAvatarClick} sx={{ p: 0.5 }}>
              <Avatar
                alt={user?.name || 'U'}
                src={user?.profile_picture || undefined}
                sx={{ width: 34, height: 34, fontSize: 14, fontWeight: 700, border: `2px solid ${theme.palette.primary.main}`, cursor: 'pointer' }}
              >
                {!user?.profile_picture && (user?.name?.[0]?.toUpperCase() || 'U')}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={profileOpen}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  mt: 1,
                  minWidth: 200,
                  borderRadius: 2,
                  boxShadow: isDark
                    ? '0 8px 32px rgba(0,0,0,0.7)'
                    : '0 8px 32px rgba(0,0,0,0.12)',
                  border: `1px solid ${theme.palette.divider}`,
                  overflow: 'visible',
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: -6,
                    right: 14,
                    width: 12,
                    height: 12,
                    backgroundColor: 'background.paper',
                    transform: 'rotate(45deg)',
                    borderTop: `1px solid ${theme.palette.divider}`,
                    borderLeft: `1px solid ${theme.palette.divider}`,
                  },
                },
              }}
            >
              {/* User Info Header */}
              <Box sx={{ px: 2, py: 1.5, borderBottom: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{user?.name || 'User'}</Typography>
                <Typography variant="caption" color="text.secondary">{user?.role || 'staff'}</Typography>
              </Box>

              <MenuItem onClick={() => { handleMenuClose(); setCurrentPage('dashboard'); }} sx={{ display: { xs: 'flex', md: 'none' }, py: 1.2, px: 2, gap: 1.5, mt: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 'unset', color: 'text.secondary' }}>
                  <DashboardIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t('menu.dashboard')}
                </Typography>
              </MenuItem>

              <MenuItem onClick={() => { handleMenuClose(); setCurrentPage('master-data'); }} sx={{ display: { xs: 'flex', md: 'none' }, py: 1.2, px: 2, gap: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 'unset', color: 'text.secondary' }}>
                  <StorageIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t('menu.master_data')}
                </Typography>
              </MenuItem>

              <MenuItem onClick={() => { handleMenuClose(); setCurrentPage('landing'); }} sx={{ py: 1.2, px: 2, gap: 1.5, mt: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 'unset', color: 'text.secondary' }}>
                  <LanguageIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {language === 'eng' ? 'View Website' : 'Lihat Website'}
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleSettings} sx={{ py: 1.2, px: 2, gap: 1.5 }}>
                <ListItemIcon sx={{ minWidth: 'unset', color: 'text.secondary' }}>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Settings</Typography>
              </MenuItem>

              <Divider sx={{ my: 0.5 }} />

              <MenuItem
                onClick={handleLogout}
                sx={{
                  py: 1.2, px: 2, gap: 1.5, mb: 0.5,
                  color: 'error.main',
                  '&:hover': { backgroundColor: 'rgba(239,68,68,0.08)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 'unset', color: 'error.main' }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawers */}
      <Box
        component="nav"
        sx={{ 
          width: { md: drawerWidth }, 
          flexShrink: { md: 0 },
          display: { xs: 'none', md: 'block' } 
        }}
        aria-label="mailbox folders"
      >
        {/* Desktop View Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: `1px solid ${theme.palette.divider}` },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Rounded Bottom Navbar for Mobile View */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 16,
          left: 16,
          right: 16,
          height: 64,
          backgroundColor: isDark ? 'rgba(10, 10, 10, 0.92)' : 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '24px',
          boxShadow: isDark
            ? '0 10px 30px -10px rgba(245, 197, 24, 0.15), 0 1px 3px rgba(0, 0, 0, 0.5)'
            : '0 10px 30px -10px rgba(245, 197, 24, 0.2), 0 2px 8px rgba(0, 0, 0, 0.08)',
          border: `1px solid ${theme.palette.divider}`,
          zIndex: theme.zIndex.appBar,
          justifyContent: 'space-around',
          alignItems: 'center',
          px: 1,
        }}
      >
        {mobileMenuItems.map((item) => {
          const active = currentPage === item.id;
          return (
            <Box
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flex: 1,
                py: 0.5,
                borderRadius: '16px',
                color: active ? theme.palette.primary.main : theme.palette.text.secondary,
                transition: 'all 0.2s ease',
                position: 'relative',
                '&:active': {
                  transform: 'scale(0.95)',
                }
              }}
            >
              {active && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 4,
                    bottom: 4,
                    left: 6,
                    right: 6,
                    backgroundColor: 'rgba(245, 197, 24, 0.15)',
                    borderRadius: '12px',
                    zIndex: -1,
                  }}
                />
              )}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.25 }}>
                {item.icon}
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: active ? 700 : 500,
                  letterSpacing: 0.2,
                  textAlign: 'center',
                  lineHeight: 1
                }}
              >
                {item.short}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Settings Modal */}
      {settingsOpen && (
        <Suspense fallback={null}>
          <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </Suspense>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          pb: { xs: '96px', sm: '96px', md: 4 },
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          maxWidth: '100%',
          mt: '64px', // Space for AppBar
          backgroundColor: theme.palette.background.default,
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
