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

import { iconFrameSx, landingHeaderSx, landingSectionSx, landingSubtitleSx, landingTitleSx } from './styles';

export default function HowItWorksSection({ t }) {
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
    <Box id="how-it-works" sx={{ ...landingSectionSx, backgroundColor: 'background.paper', transition: 'background-color 0.3s ease' }}>
      <Container maxWidth="md">
        <Box sx={landingHeaderSx}>
          <Typography variant="h2" sx={landingTitleSx}>
            {t('landing.howItWorksTitle')}
          </Typography>
          <Typography variant="body1" sx={landingSubtitleSx}>
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
                      <Box sx={iconFrameSx(36, 19)}>
                        {step.icon}
                      </Box>
                    ),
                  }}
                  sx={{ '& .MuiStepLabel-iconContainer': { pr: 1.25 } }}
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
              top: 26,
              left: 'calc(12.5% + 26px)',
              right: 'calc(12.5% + 26px)',
              height: 2,
              backgroundColor: 'divider',
              zIndex: 0,
            }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              {steps.map((step, idx) => (
                <Box key={idx} sx={{ width: '25%', textAlign: 'center', position: 'relative', zIndex: 1, px: 1 }}>
                  <Box
                    sx={{
                      ...iconFrameSx(52, 24),
                      mx: 'auto',
                      mb: 2.5,
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      border: '1px solid',
                      borderColor: 'primary.main',
                      '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' },
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
