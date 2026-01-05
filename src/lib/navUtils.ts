'use client';

import React from "react";
import { useParams, usePathname } from "next/navigation";
import {
  Home as HomeIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Mail as MailIcon,
  PermIdentity as PermIdentityIcon,
} from '@mui/icons-material';

export interface MenuItem {
  link: string;
  name: string;
  icon: React.ReactNode; // Use ElementType for component references
}

export type NavbarKeys = 'logo' | 'home' | 'about' | 'portfolio' | 'contact' | 'blog';

export const localeNames: Record<string, Record<NavbarKeys, string>> = {
  ar: {
    logo: 'سوباش',
    home: 'الرئيسية',
    about: 'من أنا',
    portfolio: 'أعمالي',
    contact: 'اتصل بي',
    blog: 'المدونة',
  },
  en: {
    logo: 'Subash',
    home: 'HOME',
    about: 'ABOUT',
    portfolio: 'PORTFOLIO',
    contact: 'CONTACT',
    blog: 'BLOG',
  },
  es: {
    logo: 'Subash',
    home: 'INICIO',
    about: 'ACERCA DE MI',
    portfolio: 'PORTAFOLIO',
    contact: 'CONTACTO',
    blog: 'BLOG',
  },
  ne: {
    logo: 'सुबास',
    home: 'गृहपृष्ठ',
    about: 'मेरो बारेमा',
    portfolio: 'मेरो कामहरू',
    contact: 'सम्पर्क गर्नुहोस्',
    blog: 'ब्लग',
  },
};

export function useNavigationLinks(isHome: boolean = false) {
  
  const params = useParams();
  const pathname = usePathname();

  const currentLocale = (params?.locale as string) || 'en';
  const labels = localeNames[currentLocale] || localeNames.en;
  
  // For home page jump prefix, other's always false
  let jumpPrefix: string = '', langPrefix: string = '';
  if (isHome) {
    langPrefix = currentLocale === 'en' ? '' : `/${currentLocale}`;
    const hasLocale = pathname === langPrefix || pathname === `${langPrefix}/`;
    jumpPrefix = hasLocale ? '#' : `${langPrefix}/#`;
  }

  const menuItems: MenuItem[] = [
  { 
    link: langPrefix || '/', 
    name: labels.home, 
    icon: React.createElement(HomeIcon) // This turns the Component into a ReactNode
  },
  { 
    link: `${jumpPrefix}about`, 
    name: labels.about, 
    icon: React.createElement(PermIdentityIcon) 
  },
  { 
    link: `${jumpPrefix}portfolio`, 
    name: labels.portfolio, 
    icon: React.createElement(WorkIcon) 
  },
  { 
    link: `${jumpPrefix}blogs`, 
    name: labels.blog, 
    icon: React.createElement(AssignmentIcon) 
  },
  { 
    link: `${jumpPrefix}contact`, 
    name: labels.contact, 
    icon: React.createElement(MailIcon) 
  }
];

  return { menuItems, labels, currentLocale };
}
