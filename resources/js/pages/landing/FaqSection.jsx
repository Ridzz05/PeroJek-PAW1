import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { iconFrameSx, landingHeaderSx, landingSectionSx, landingSubtitleSx, landingTitleSx } from './styles';

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
    <Box id="faq" sx={{ ...landingSectionSx, backgroundColor: 'background.default', transition: 'background-color 0.3s ease' }}>
      <Container maxWidth="md">
        <Box sx={landingHeaderSx}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'center' }, gap: 1.25, mb: 1.5 }}>
            <Box sx={iconFrameSx(40, 21)}>
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

        <Box sx={{ '& .MuiAccordion-root': { border: '1px solid', borderColor: 'divider', borderRadius: '8px !important', mb: 1.25, overflow: 'hidden', '&:before': { display: 'none' } } }}>
          {faqs.map((faq, idx) => (
            <Accordion
              key={idx}
              expanded={expanded === idx}
              onChange={handleChange(idx)}
              sx={{ backgroundColor: 'background.paper', boxShadow: 'none' }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main', fontSize: 22 }} />}
                sx={{
                  px: { xs: 2, md: 2.5 },
                  py: 1,
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  '&.Mui-expanded': { borderBottom: `1px solid`, borderColor: 'divider' },
                }}
              >
                {faq.question}
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 2, md: 2.5 }, py: 2.25 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
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
