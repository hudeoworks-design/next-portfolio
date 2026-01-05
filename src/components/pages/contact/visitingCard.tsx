"use client";
import { Card, CardContent, Typography, Box, Avatar, Divider, IconButton, Stack } from '@mui/material';
import { Email, Phone, Language, LinkedIn, GitHub, Twitter } from '@mui/icons-material';

export default function VisitingCard() {
  return (
    <Card 
      sx={{  
        display: 'flex', 
        borderRadius: 0, 
        boxShadow: 10,
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'visible'
      }}
    >
      {/* Accent Line */}
      <Box sx={{ width: 8, bgcolor: 'primary.main', height: '100%' }} />

      <CardContent sx={{ flex: 1, p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar 
            src="/subash.jpeg" 
            sx={{ width: 64, height: 64, border: '2px solid white' }} 
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">Subash Maharjan</Typography>
            <Typography variant="body2" color="primary.light">Senior Software Engineer</Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

        <Stack spacing={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <Email fontSize="small" color="primary" />
            <Typography variant="caption">hudeoworks@gmail.com</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Phone fontSize="small" color="primary" />
            <Typography variant="caption">+1 (321) 948-6213</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Language fontSize="small" color="primary" />
            <Typography variant="caption">www.subashmaharjan.com</Typography>
          </Box>
        </Stack>

        <Box sx={{ position: 'absolute', bottom: 10, right: 10 }}>
          <IconButton size="small" sx={{ color: 'white' }}><LinkedIn fontSize="small" /></IconButton>
          <IconButton size="small" sx={{ color: 'white' }}><GitHub fontSize="small" /></IconButton>
          <IconButton size="small" sx={{ color: 'white' }}><Twitter fontSize="small" /></IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}
