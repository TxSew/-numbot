import { Box } from '@mui/material';

interface SettingsButtonProps {
    src: string;
    shadowColorTop: string;
    shadowColorBottom: string;
    onClick: () => void;
}

export default function ButtonsAction({ src, shadowColorTop, shadowColorBottom, onClick }: SettingsButtonProps) {
    return (
        <Box
            sx={{
                transition: 'filter 0.3s ease',
                '&:hover': {
                    filter: `
                        drop-shadow(0 0 5px ${shadowColorTop})
                        drop-shadow(0 0 7px ${shadowColorBottom})`,
                    cursor: 'pointer',
                },
            }}
            onClick={onClick}
        >
            <img
                src={src}
                style={{
                    width: '50px',
                    height: '50px',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius: '50%',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    transition: 'filter 0.3s ease',
                }}
            />
        </Box>
    );
}
