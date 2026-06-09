import React from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

export default function FleetSection({
  isDark,
  language,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  loading,
  filteredVehicles,
  handleBookNow,
  t,
}) {
  const theme = useTheme();

  return (
    <Box id="fleet" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, mb: 2 }}>
            {t('landing.fleetTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', mb: 4, fontWeight: 500 }}>
            {t('landing.fleetSubtitle')}
          </Typography>

          {/* Filter Search */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center', alignItems: 'center', maxWidth: 700, mx: 'auto', mb: 4 }}>
            <TextField
              placeholder={t('landing.searchPlaceholder')}
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
                sx: { borderRadius: 3, background: 'background.paper' }
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
                  <Tab key={cat} label={cat === 'All' ? t('landing.allVehicles') : cat} value={cat} />
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
                vehicle.status === 'Available' ? t('landing.available') :
                vehicle.status === 'Rented' ? t('landing.rented') : t('landing.maintenance');

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
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: isDark ? '0 15px 30px rgba(0,0,0,0.6)' : '0 15px 30px rgba(0,0,0,0.06)',
                        borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)',
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={vehicle.image_url || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'}
                        alt={vehicle.model}
                        sx={{
                          transition: 'transform 0.5s ease',
                          '&:hover': { transform: 'scale(1.08)' },
                        }}
                      />
                      {/* Gradient overlay on image bottom */}
                      <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 50,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
                        pointerEvents: 'none',
                      }} />
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
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, mt: 0.5, lineHeight: 1.2 }}>
                        {vehicle.brand} {vehicle.model}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontWeight: 600 }}>
                        No: {vehicle.license_plate}
                      </Typography>

                      {/* Vehicle spec icons row */}
                      <Box sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 2,
                        pb: 2,
                        borderBottom: 1,
                        borderColor: 'divider',
                      }}>
                        {vehicle.seats && (
                          <Tooltip title={t('landing.seats')} arrow placement="top">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <AirlineSeatReclineNormalIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                {vehicle.seats}
                              </Typography>
                            </Box>
                          </Tooltip>
                        )}
                        {vehicle.transmission && (
                          <Tooltip title={t('landing.transmission')} arrow placement="top">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <SettingsIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                {vehicle.transmission}
                              </Typography>
                            </Box>
                          </Tooltip>
                        )}
                        {vehicle.fuel_type && (
                          <Tooltip title={t('landing.fuel')} arrow placement="top">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <LocalGasStationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                {vehicle.fuel_type}
                              </Typography>
                            </Box>
                          </Tooltip>
                        )}
                      </Box>

                      <Box sx={{ mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 900, color: 'primary.main' }}>
                            Rp {Number(vehicle.daily_rate).toLocaleString('id-ID')}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, fontWeight: 700 }}>
                            / {t('landing.daily')}
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
                          {t('landing.rentNow')}
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
  );
}
