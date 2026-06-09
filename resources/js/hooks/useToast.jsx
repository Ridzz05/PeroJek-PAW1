import React, { useState, useCallback } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

/**
 * useToast hook — eliminates duplicated toast state across pages.
 *
 * Usage:
 *   const { showToast, ToastComponent } = useToast();
 *   showToast('Saved!', 'success');
 *   ...
 *   return <>{ToastComponent}</>;
 *
 * @param {{ autoHideDuration?: number, anchorOrigin?: object }} options
 */
export default function useToast({
  autoHideDuration = 4000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
} = {}) {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = useCallback((message, severity = 'success') => {
    setToast({ open: true, message, severity });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }));
  }, []);

  const ToastComponent = (
    <Snackbar
      open={toast.open}
      autoHideDuration={autoHideDuration}
      onClose={closeToast}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={closeToast} severity={toast.severity} sx={{ width: '100%', borderRadius: 2 }}>
        {toast.message}
      </Alert>
    </Snackbar>
  );

  return { toast, showToast, closeToast, ToastComponent };
}
