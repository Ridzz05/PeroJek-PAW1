import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Full-page centered loading spinner.
 * Used as a replacement for the duplicated loading state across all pages.
 */
export default function PageLoader({ size = 60, thickness = 4 }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
      <CircularProgress size={size} thickness={thickness} />
    </Box>
  );
}
