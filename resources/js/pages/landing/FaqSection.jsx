import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { iconFrameSx, landingCardSx, landingHeaderSx, landingSectionSx, landingSubtitleSx, landingTitleSx } from './styles';

export default function FaqSection({ t }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    { question: t('landing.faqQuestion1'), answer: t('landing.faqAnswer1') },
    { question: t('landing.faqQuestion2'), answer: t('landing.faqAnswer2') },
    { question: t('landing.faqQuestion3'), answer: t('landing.faqAnswer3') },
    { question: t('landing.faqQuestion4'), answer: t('landing.faqAnswer4') },
    { question: t('landing.faqQuestion5'), answer: t('landing.faqAnswer5') },
  ];

  return (
    <Box id="faq" sx={landingSectionSx}>
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={landingHeaderSx}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'center' }, gap: { xs: 1, md: 1.25 }, mb: 1.5 }}>
            <Box sx={iconFrameSx(36, 19)}>
              <HelpOutlineIcon />
            </Box>
            <Typography variant="h2" sx={{ ...landingTitleSx, mb: 0 }}>
              {t('landing.faqTitle')}
            </Typography>
          </Box>
          <Typography variant="body1" sx={landingSubtitleSx}>
            {t('landing.faqSubtitle')}
          </Typography>
        </Box>

        <Box
          sx={{
            '& .MuiAccordion-root': {
              ...landingCardSx,
              borderRadius: '8px !important',
              mb: 1.25,
              overflow: 'hidden',
              '&:before': { display: 'none' },
            },
          }}
        >
          {faqs.map((faq, idx) => (
            <Accordion
              key={idx}
              expanded={expanded === idx}
              onChange={handleChange(idx)}
              sx={{ boxShadow: '0 16px 44px rgba(0,0,0,0.2)' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#FFFFFF', fontSize: 22 }} />}
                sx={{
                  px: { xs: 2, md: 2.5 },
                  py: { xs: 0.65, md: 1 },
                  fontWeight: 700,
                  fontSize: { xs: '0.86rem', md: '0.95rem' },
                  color: '#FFFFFF',
                  '&.Mui-expanded': { borderBottom: '1px solid rgba(255,255,255,0.14)' },
                }}
              >
                {faq.question}
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 2, md: 2.5 }, py: { xs: 1.5, md: 2.25 } }}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.82rem', md: '0.875rem' }, lineHeight: { xs: 1.55, md: 1.7 } }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
