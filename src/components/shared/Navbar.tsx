import React from 'react';
import Link from 'next/link';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/works', label: 'Works' },
    { href: '/contact', label: 'Contact' },
];

const Navbar: React.FC = () => (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="text-2xl font-bold">
                <Link href="/">MyPortfolio</Link>
            </div>
            <ul className="flex space-x-6">
                {navLinks.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href} className="hover:text-blue-400 transition-colors">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </nav>
);

export default Navbar;