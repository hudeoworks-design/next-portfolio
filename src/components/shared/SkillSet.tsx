import React from 'react';
import Box from '@mui/material/Box';
import skillIcons from '../pages/constants/skillIcons';

const SkillSet: React.FC = () => {
    return (
        <Box
            flex={1}
            bgcolor="background.default"
            borderRadius={2}
            p={2}
            mb={4}
            mt={2}
        >
            <Box display="flex" flexDirection="column" gap={1.5}>
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
            </Box>
        </Box>
    );
}

export default SkillSet;