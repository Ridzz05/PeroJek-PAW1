export const landingSectionSx = {
  py: { xs: 7, md: 10 },
};

export const landingHeaderSx = {
  textAlign: { xs: 'left', md: 'center' },
  mb: { xs: 4, md: 6 },
};

export const landingTitleSx = {
  fontSize: { xs: '1.85rem', md: '2.35rem' },
  fontWeight: 800,
  lineHeight: 1.15,
  letterSpacing: 0,
  mb: 1.5,
};

export const landingSubtitleSx = {
  color: 'text.secondary',
  maxWidth: 600,
  mx: { xs: 0, md: 'auto' },
  fontWeight: 500,
  lineHeight: 1.7,
};

export const landingCardSx = {
  borderRadius: '8px',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: 'none',
};

export const iconFrameSx = (size = 44, iconSize = 22) => ({
  width: size,
  height: size,
  minWidth: size,
  borderRadius: '8px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'action.selected',
  color: 'primary.main',
  '& .MuiSvgIcon-root': {
    fontSize: iconSize,
  },
});
