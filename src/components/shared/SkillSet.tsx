import React from 'react';
import Box from '@mui/material/Box';
import skillIcons from '../pages/constants/skillIcons';

const SkillSet: React.FC = () => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    fontSize: '3.5rem',
                    gap: 3,
                    justifyContent: {
                        xs: 'center',
                        md: 'flex-start',
                    },
                }}
            >
                {skillIcons.map((skillIcon) => (
                    <Box
                        key={skillIcon.label}
                        title={skillIcon.label}
                        sx={{
                            transition: 'transform 0.2s, color 0.2s',
                            '&:hover': {
                                color: 'primary.main',
                                transform: 'translateY(-5px)',
                            },
                        }}
                    >
                        {skillIcon.icon}
                    </Box>
                ))}
            </Box>
        </>
    );
}

export default SkillSet;