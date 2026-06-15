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
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

import { iconFrameSx, landingCardSx, landingHeaderSx, landingSectionSx, landingSubtitleSx, landingTitleSx } from './styles';

export default function FleetSection({
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
  return (
    <Box id="fleet" sx={{ ...landingSectionSx, py: { xs: 4.5, md: 8 } }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={landingHeaderSx}>
          <Typography variant="h2" sx={landingTitleSx}>
            {t('landing.fleetTitle')}
          </Typography>
          <Typography variant="body1" sx={{ ...landingSubtitleSx, mb: { xs: 2, md: 3 } }}>
            {t('landing.fleetSubtitle')}
          </Typography>

          {/* Filter Search */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: { xs: 'flex-start', sm: 'center' }, alignItems: { xs: 'stretch', sm: 'center' }, maxWidth: 680, mx: { xs: 0, sm: 'auto' }, mb: { xs: 2, md: 3 } }}>
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
                    <SearchIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.62)' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '8px',
                  background: 'rgba(8,8,10,0.48)',
                  color: '#FFFFFF',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.16)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#FFFFFF' },
                  '& input': { color: '#FFFFFF' },
                  '& input.MuiInputBase-input': { py: { xs: 1.05, md: 1 } },
                  '& input::placeholder': { color: 'rgba(255,255,255,0.58)', opacity: 1 },
                }
              }}
            />
          </Box>

          {/* Category Tabs */}
          {categories.length > 1 && (
            <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.16)', display: 'flex', justifyContent: 'center', mb: { xs: 2.5, md: 4 } }}>
              <Tabs
                value={selectedCategory}
                onChange={(e, val) => setSelectedCategory(val)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTabs-indicator': { backgroundColor: '#FFFFFF', height: 3 },
                  '& .MuiTab-root': {
                    minHeight: { xs: 36, md: 42 },
                    fontWeight: 700,
                    px: { xs: 1.25, md: 2.5 },
                    textTransform: 'uppercase',
                    letterSpacing: 0,
                    fontSize: { xs: '0.7rem', md: '0.78rem' },
                    color: 'rgba(255,255,255,0.62)',
                  },
                  '& .MuiTab-root.Mui-selected': { color: '#FFFFFF' },
                  '& .MuiTabs-scrollButtons': { color: '#FFFFFF' },
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
          <Grid container spacing={{ xs: 1.5, md: 3 }}>
            {filteredVehicles.map((vehicle) => {
              const isAvail = vehicle.status === 'Available';
              const statusLabel =
                vehicle.status === 'Available' ? t('landing.available') :
                vehicle.status === 'Rented' ? t('landing.rented') : t('landing.maintenance');
              const specs = [
                vehicle.seats && {
                  key: 'seats',
                  title: t('landing.seats'),
                  icon: <AirlineSeatReclineNormalIcon />,
                  value: vehicle.seats,
                },
                vehicle.transmission && {
                  key: 'transmission',
                  title: t('landing.transmission'),
                  icon: <SettingsIcon />,
                  value: vehicle.transmission,
                },
                vehicle.fuel_type && {
                  key: 'fuel',
                  title: t('landing.fuel'),
                  icon: <LocalGasStationIcon />,
                  value: vehicle.fuel_type,
                },
              ].filter(Boolean);

              let badgeColor = 'error';
              if (isAvail) badgeColor = 'success';
              else if (vehicle.status === 'Rented') badgeColor = 'warning';

              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={vehicle.id}>
                  <Card
                    sx={{
                      ...landingCardSx,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 24px 70px rgba(0,0,0,0.36)',
                        borderColor: 'rgba(255,255,255,0.28)',
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="168"
                        image={vehicle.image_url || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'}
                        alt={vehicle.model}
                        sx={{
                          height: { xs: 142, sm: 156, md: 168 },
                          objectFit: 'cover',
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
                          borderRadius: '8px',
                          backdropFilter: 'blur(8px)',
                          background: isAvail ? 'rgba(34,197,94,0.9)' : undefined
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: { xs: 1.5, md: 2.25 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.58)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0 }}>
                        {vehicle.category?.name || 'VEHICLE'}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5, mt: 0.5, lineHeight: 1.2, color: '#FFFFFF', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                        {vehicle.brand} {vehicle.model}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', mb: specs.length ? { xs: 1.25, md: 2 } : { xs: 1.5, md: 2.5 }, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
                        No: {vehicle.license_plate}
                      </Typography>

                      {/* Vehicle spec icons row */}
                      {specs.length > 0 && (
                        <Box sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: { xs: 0.75, md: 1 },
                          mb: { xs: 1.35, md: 2 },
                          pb: { xs: 1.35, md: 2 },
                          borderBottom: '1px solid rgba(255,255,255,0.14)',
                        }}>
                          {specs.map((spec) => (
                            <Tooltip key={spec.key} title={spec.title} arrow placement="top">
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 0 }}>
                                <Box sx={iconFrameSx(28, 15)}>
                                  {spec.icon}
                                </Box>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'rgba(255,255,255,0.68)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {spec.value}
                                </Typography>
                              </Box>
                            </Tooltip>
                          ))}
                        </Box>
                      )}

                      <Box sx={{ mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', mb: { xs: 1.35, md: 2 } }}>
                          <Typography variant="h6" sx={{ fontWeight: 900, color: '#FFFFFF', fontSize: { xs: '1rem', md: '1.25rem' } }}>
                            Rp {Number(vehicle.daily_rate).toLocaleString('id-ID')}
                          </Typography>
                          <Typography variant="caption" sx={{ ml: 0.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>
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
                            borderRadius: '8px',
                            fontWeight: 700,
                            py: { xs: 0.85, md: 1 },
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
