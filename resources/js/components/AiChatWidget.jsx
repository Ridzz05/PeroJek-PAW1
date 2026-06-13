import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { apiFetch } from '../utils/api';

const aiCsLogo = '/assets/logo/ai-cs-logo.svg';

const initialMessages = [
  {
    role: 'assistant',
    content: 'Halo, saya asisten AI Smart Rental. Saya bisa bantu jelaskan fitur, alur sewa, dashboard, armada, pelanggan, dan penggunaan sistem.',
  },
];

export default function AiChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendMessage = async (event) => {
    event.preventDefault();

    const content = input.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: 'user', content }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await apiFetch('/api/ai-chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => ['user', 'assistant'].includes(message.role))
            .slice(-10),
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'AI assistant sedang tidak tersedia.');
      }

      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: data.message || 'Maaf, saya belum bisa menjawab saat ini.',
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: error.message || 'AI assistant sedang tidak tersedia.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open ? (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1700,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.default',
          }}
        >
          <Box
            component="header"
            sx={{
              px: { xs: 1.5, md: 3 },
              py: { xs: 1.25, md: 1.5 },
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              borderBottom: 1,
              borderColor: 'divider',
              backgroundColor: 'background.paper',
            }}
          >
            <IconButton onClick={() => setOpen(false)} size="small" sx={{ borderRadius: '8px', display: { xs: 'inline-flex', md: 'none' } }}>
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFFFFF',
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={aiCsLogo}
                alt="SRS AI CS"
                sx={{ width: 34, height: 34, objectFit: 'contain' }}
              />
            </Box>
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                Smart Rental Support
              </Typography>
              <Typography variant="caption" color="text.secondary">
                AI customer service untuk panduan sistem
              </Typography>
            </Box>
            <IconButton onClick={() => setOpen(false)} size="small" sx={{ borderRadius: '8px', display: { xs: 'none', md: 'inline-flex' } }}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          <Box
            ref={listRef}
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              px: { xs: 1.5, md: 3 },
              py: { xs: 2, md: 3 },
              backgroundColor: 'background.default',
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 880, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  px: 1.5,
                  py: 1.25,
                  mb: 0.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '8px',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    src={aiCsLogo}
                    alt="SRS AI CS"
                    sx={{ width: 30, height: 30, objectFit: 'contain' }}
                  />
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    SRS AI sedang online
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Tanya alur sewa, dashboard, fleet, customer, rental, atau master data.
                  </Typography>
                </Box>
              </Box>

              {messages.map((message, index) => {
                const isUser = message.role === 'user';

                return (
                  <Box
                    key={`${message.role}-${index}`}
                    sx={{
                      display: 'flex',
                      justifyContent: isUser ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: { xs: '88%', md: '72%' },
                        px: { xs: 1.5, md: 2 },
                        py: 1.25,
                        borderRadius: '8px',
                        border: isUser ? 'none' : '1px solid',
                        borderColor: 'divider',
                        backgroundColor: isUser ? 'primary.main' : 'background.paper',
                        color: isUser ? 'primary.contrastText' : 'text.primary',
                      }}
                    >
                      <Typography variant="caption" sx={{ display: 'block', mb: 0.5, fontWeight: 800, opacity: 0.72 }}>
                        {isUser ? 'Anda' : 'Smart Rental Support'}
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.65 }}>
                        {message.content}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
              {loading && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', px: 1 }}>
                  <CircularProgress size={16} thickness={4} />
                  <Typography variant="caption">Support sedang mengetik...</Typography>
                </Box>
              )}
            </Box>
          </Box>

          <Box sx={{ px: { xs: 1.5, md: 3 }, py: { xs: 1.25, md: 1.75 }, borderTop: 1, borderColor: 'divider', backgroundColor: 'background.paper' }}>
            <Box component="form" onSubmit={sendMessage} sx={{ width: '100%', maxWidth: 880, mx: 'auto', display: 'flex', gap: 1 }}>
              <TextField
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Tulis pesan ke support..."
                size="small"
                fullWidth
                multiline
                maxRows={4}
                disabled={loading}
                InputProps={{ sx: { borderRadius: '8px' } }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!input.trim() || loading}
                sx={{ minWidth: { xs: 44, md: 104 }, px: { xs: 0, md: 2 }, borderRadius: '8px', fontWeight: 800 }}
                endIcon={<SendIcon sx={{ display: { xs: 'none', md: 'inline-flex' }, fontSize: 18 }} />}
              >
                <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>Kirim</Box>
                <SendIcon sx={{ display: { xs: 'inline-flex', md: 'none' }, fontSize: 19 }} />
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'fixed',
            right: { xs: 16, md: 24 },
            bottom: { xs: 88, md: 24 },
            zIndex: 1500,
          }}
        >
          <Button
            variant="contained"
            onClick={() => setOpen(true)}
            startIcon={(
              <Box
                component="img"
                src={aiCsLogo}
                alt=""
                aria-hidden="true"
                sx={{ width: 30, height: 30, objectFit: 'contain', display: 'block' }}
              />
            )}
            sx={{
              height: 54,
              pl: 1.25,
              pr: 2,
              borderRadius: '8px',
              fontWeight: 800,
              boxShadow: '0 12px 30px rgba(0,0,0,0.22)',
              '& .MuiButton-startIcon': {
                mr: 1,
                p: 0.25,
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
              },
            }}
          >
            Message
          </Button>
        </Box>
      )}
    </>
  );
}
