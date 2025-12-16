'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Alert 
} from '@mui/material';

const Contact: React.FC = () => {
    // 1. Hook to access translation keys from your JSON (namespace: 'Contact')
    const t = useTranslations('contact');
    
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    {t('title')}
                </Typography>

                {submitted ? (
                    <Alert severity="success" sx={{ mt: 2 }}>
                        {t('successMessage')}
                    </Alert>
                ) : (
                    <Box 
                        component="form" 
                        onSubmit={handleSubmit} 
                        noValidate 
                        sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}
                    >
                        <TextField
                            fullWidth
                            label={t('fields.name')}
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label={t('fields.email')}
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label={t('fields.message')}
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            size="large"
                            sx={{ mt: 1, py: 1.5 }}
                        >
                            {t('submitButton')}
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default Contact;
