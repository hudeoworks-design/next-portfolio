'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    Card,
    Grid
} from '@mui/material';
import { ConnectWithoutContactTwoTone } from '@mui/icons-material';
import VisitingCard from './contact/visitingCard';

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
        <Box
            component="section"
            id="contact"
            sx={{
                py: 2,
                color: 'text.primary'
            }}
        >
            <Card
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 0,
                    px: 4,
                    height: '100%',
                    transition: 'background-color 0.3s'
                }}
            >
                <Grid container spacing={4}>
                    <Grid size={6} sx={{ xs: 12, md: 4 }}>
                        <Box sx={{ py: 4, px: 2, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                            <VisitingCard />
                            <Button
                                color="primary"
                                endIcon={<ConnectWithoutContactTwoTone />}
                                href="/contact"
                                sx={{ '&:hover': { color: 'primary.main' }, transition: 'color 0.3s', mt: 2 }}
                                variant="outlined"
                            >
                                {t('title')}
                            </Button>
                        </Box>
                    </Grid>
                    <Grid size={6} sx={{ xs: 12, md: 8, py: 4 }}>

                        <Paper elevation={3} sx={{ p: 4, borderRadius: 0, width: '100%' }}>
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

                    </Grid>

                </Grid>
            </Card>

        </Box >

    );
};

export default Contact;
