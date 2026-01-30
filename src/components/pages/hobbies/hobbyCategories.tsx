'use client';

import { Face } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export interface HobbiesProps {
  type: string;
  img: {
    src: string,
    alt: string
  }
  fields: string[];
}

export interface HobbiesCategoryProps {
  category: HobbiesProps;
}

export default function HobbyCategory({category}: HobbiesCategoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeField = searchParams.get('category') || '';

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());    
    if (newCategory) {
      params.set('category', newCategory.toLowerCase());
    } else {
      params.delete('category'); 
    }
    
    router.push(`${pathname}/${category.type.toLowerCase()}?${params.toString()}`, { scroll: false });
  };

  return (
    category.fields.map((field) => (
      <div key={field}>
        {
          activeField === field.toLowerCase() ? 
          <Chip onClick={() => handleCategoryChange(field.toLowerCase())} icon={<Face />} label={field} sx={{ m: 1}} variant="outlined" /> :
          <Chip onClick={() => handleCategoryChange(field.toLowerCase())} icon={<Face />} label={field} sx={{ m: 1}}/>
        }
      </div>
      
    
    ))
  );
}