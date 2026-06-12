import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentsIcon from '@mui/icons-material/Payments';
import CelebrationIcon from '@mui/icons-material/Celebration';

export default function HowItWorksSection({ isDark, t }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const steps = [
    {
      icon: <SearchIcon />,
      title: t('landing.howItWorksStep1Title'),
      desc: t('landing.howItWorksStep1Desc'),
    },
    {
      icon: <CalendarMonthIcon />,
      title: t('landing.howItWorksStep2Title'),
      desc: t('landing.howItWorksStep2Desc'),
    },
    {
      icon: <PaymentsIcon />,
      title: t('landing.howItWorksStep3Title'),
      desc: t('landing.howItWorksStep3Desc'),
    },
    {
      icon: <CelebrationIcon />,
      title: t('landing.howItWorksStep4Title'),
      desc: t('landing.howItWorksStep4Desc'),
    },
  ];

  return (
    <Box id="how-it-works" sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper', transition: 'background-color 0.3s ease' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, mb: 2 }}>
            {t('landing.howItWorksTitle')}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 500 }}>
            {t('landing.howItWorksSubtitle')}
          </Typography>
        </Box>

        {isMobile ? (
          <Stepper orientation="vertical" sx={{ '& .MuiStepConnector-line': { borderColor: 'divider' } }}>
            {steps.map((step, idx) => (
              <Step key={idx} active>
                <StepLabel
                  StepIconProps={{
                    icon: (
                      <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {step.icon}
                      </Box>
                    ),
                  }}
                  sx={{ '& .MuiStepLabel-iconContainer': { color: 'primary.main' } }}
                >
                  <Typography sx={{ fontWeight: 800, fontSize: '1rem' }}>{step.title}</Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                    {step.desc}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        ) : (
          <Box sx={{ position: 'relative' }}>
            {/* Connecting line */}
            <Box sx={{
              position: 'absolute',
              top: 32,
              left: 'calc(12.5% + 32px)',
              right: 'calc(12.5% + 32px)',
              height: 2,
              backgroundColor: 'divider',
              zIndex: 0,
            }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {steps.map((step, idx) => (
                <Box key={idx} sx={{ width: '25%', textAlign: 'center', position: 'relative', zIndex: 1, px: 1 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 999,
                      backgroundColor: 'action.selected',
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2.5,
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      border: `2px solid`,
                      borderColor: 'primary.main',
                      '&:hover': { transform: 'scale(1.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, fontSize: '1rem' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, px: 1 }}>
                    {step.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
