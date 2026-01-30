'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface CategoryDropdownProps {
  currentCategory: {
    type: string;
    fields: string[];
  };
}

export default function CategoryDropdown({ currentCategory }: CategoryDropdownProps) {
  // 1. Initialize the hooks
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 2. Get the current active value from the URL to keep the <select> in sync
  const activeField = searchParams.get('category') || '';

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Update the 'type' to match the current card and set the specific field
    // params.set('type', currentCategory.type.toLowerCase());
    
    if (newCategory) {
      params.set('category', newCategory.toLowerCase());
    } else {
      params.delete('category'); 
    }

    // router.push(`${pathname}/${params.toString()}`, { scroll: false });
    
    router.push(`${pathname}/${currentCategory.type.toLowerCase()}?${params.toString()}`, { scroll: false });
  };

  return (
    <select 
      // 3. Bind the value to the URL state
      value={activeField} 
      onChange={(e) => handleCategoryChange(e.target.value)}
      className="mt-4 p-2 border rounded w-full"
    >
      <option value={currentCategory.type.toLowerCase()}>All {currentCategory.type}</option>
      {currentCategory.fields.map((field) => (
        <option key={field} value={field.toLowerCase()}>
          {field}
        </option>
      ))}
    </select>
  );
}
