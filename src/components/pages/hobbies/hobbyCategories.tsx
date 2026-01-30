'use client';

import { ImageOverlay } from '@/components/shared/ui/ImageOverlay';
import { getDataUrlWithShimmerEffect } from '@/lib/image.utils';
import { Face } from '@mui/icons-material';
import { Card, Box, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Chip, Avatar, Button, Container, Divider, Grid, styled } from '@mui/material';
import Link from 'next/link';
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
  category: HobbiesProps; // Nest the actual data interface here
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

{/* <div className="flex flex-wrap gap-2 mt-4">
  <button
    onClick={() => handleCategoryChange(currentCategory.type.toLowerCase())}
    className={`px-4 py-2 rounded-full border text-sm transition-colors ${
      activeField === currentCategory.type.toLowerCase()
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }`}
  >
    {currentCategory.type}
  </button>

  {currentCategory.fields.map((field) => (
    <button
      key={field}
      onClick={() => handleCategoryChange(field.toLowerCase())}
      className={`px-4 py-2 rounded-full border text-sm transition-colors ${
        activeField === field.toLowerCase()
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      }`}
    >
      {field}
    </button>
  ))}
</div> */}

    // <select 
    //   // 3. Bind the value to the URL state
    //   value={activeField} 
    //   onChange={(e) => handleCategoryChange(e.target.value)}
    //   className="mt-4 p-2 border rounded w-full"
    // >
    //   <option value={currentCategory.type.toLowerCase()}>All {currentCategory.type}</option>
    //   {currentCategory.fields.map((field) => (
    //     <option key={field} value={field.toLowerCase()}>
    //       {field}
    //     </option>
    //   ))}
    // </select>