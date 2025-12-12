import { styled } from '@mui/material/styles';
import Link from './Link'; // Ensure this is your custom or library Link

const AnimatedLink = styled(Link)(({ theme }) => ({
  display: 'inline-block', // Crucial for padding and positioning to work correctly
  padding: '12px 15px',
  textDecoration: 'none',
  position: 'relative',
  color: 'inherit', // Optional: ensures link color matches surrounding text
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '2px',
    bottom: 0,
    left: 0,
    backgroundColor: theme.palette?.secondary?.main || '#f50057', // Recommended to use theme palette
    visibility: 'hidden',
    transition: 'all 0.3s ease-in-out',
  },
  '&:hover::before': {
    visibility: 'visible',
    width: '100%',
  },
}));

export default AnimatedLink;