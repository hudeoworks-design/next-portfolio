import * as MuiIcons from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

export type IconNames = keyof typeof MuiIcons;

interface DynamicMuiIconProps extends SvgIconProps {
  iconName: IconNames;
}

const DynamicMuiIcon = ({ iconName, ...props }: DynamicMuiIconProps) => {
  
  const IconComponent = MuiIcons[iconName] as React.ElementType;

  if (!IconComponent) {
    return null; 
  }

  return <IconComponent {...props} />;
};

export default DynamicMuiIcon;
