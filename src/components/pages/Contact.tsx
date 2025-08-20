'use client';

import React, { useState } from 'react';

const Contact: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend or API
        setSubmitted(true);
    };

    return (
        <section>
            <h2>Contact Me</h2>
            {submitted ? (
                <p>Thank you for reaching out! I&apos;ll get back to you soon.</p>
            ) : (
                <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={5}
                        />
                    </div>
                    <button type="submit">Send</button>
                </form>
            )}
        </section>
    );
};

export default Contact;