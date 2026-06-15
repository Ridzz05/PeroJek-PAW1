export const landingSectionSx = {
  minHeight: { xs: 'calc(100svh - 60px)', md: 'calc(100svh - 72px)' },
  py: { xs: 4.5, sm: 5.5, md: 9 },
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  position: 'relative',
  scrollSnapAlign: 'start',
  scrollSnapStop: 'always',
  color: '#FFFFFF',
  backgroundColor: 'transparent',
};

export const landingHeaderSx = {
  textAlign: { xs: 'left', md: 'center' },
  mb: { xs: 2.5, md: 5 },
};

export const landingTitleSx = {
  fontSize: { xs: '1.55rem', sm: '1.8rem', md: '2.35rem' },
  fontWeight: 800,
  lineHeight: 1.15,
  letterSpacing: 0,
  mb: 1.5,
  color: '#FFFFFF',
  textShadow: { xs: '0 2px 10px rgba(0,0,0,0.9)', md: '0 14px 44px rgba(0,0,0,0.58)' },
};

export const landingSubtitleSx = {
  color: { xs: 'rgba(255,255,255,0.88)', md: 'rgba(255,255,255,0.72)' },
  maxWidth: 600,
  mx: { xs: 0, md: 'auto' },
  fontWeight: 500,
  fontSize: { xs: '0.88rem', md: '1rem' },
  lineHeight: { xs: 1.55, md: 1.7 },
  textShadow: { xs: '0 2px 8px rgba(0,0,0,0.85)', md: '0 8px 28px rgba(0,0,0,0.45)' },
};

export const landingCardSx = {
  borderRadius: '8px',
  border: { xs: '1px solid rgba(255,255,255,0.2)', md: '1px solid rgba(255,255,255,0.14)' },
  background: { xs: 'transparent', md: 'rgba(8, 8, 10, 0.42)' },
  backdropFilter: { xs: 'none', md: 'blur(22px)' },
  WebkitBackdropFilter: { xs: 'none', md: 'blur(22px)' },
  boxShadow: { xs: 'none', md: '0 22px 60px rgba(0,0,0,0.28)' },
  color: '#FFFFFF',
};

export const iconFrameSx = (size = 44, iconSize = 22) => ({
  width: size,
  height: size,
  minWidth: size,
  borderRadius: '8px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255,0.12)',
  border: '1px solid rgba(255,255,255,0.14)',
  color: '#FFFFFF',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
  '& .MuiSvgIcon-root': {
    fontSize: iconSize,
  },
});
