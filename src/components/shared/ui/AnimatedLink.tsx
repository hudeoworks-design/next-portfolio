import { styled } from '@mui/material/styles';
import Link from '../Link'; 

/**
 * An animated link component that displays an expanding underline on hover.
 */
const AnimatedLink = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  padding: '12px 15px',
  textDecoration: 'none',
  position: 'relative',
  color: theme.palette.text.primary, 
  
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '2px',
    bottom: 0,
    backgroundColor: theme.palette.primary.main, 
    visibility: 'hidden',
    transition: 'width 0.3s ease-in-out, visibility 0.3s ease-in-out',
    [theme.direction === 'rtl' ? 'right' : 'left']: 0,
  },

  '&:hover::before': {
    visibility: 'visible',
    width: '100%',
  },
}));

export default AnimatedLink;
