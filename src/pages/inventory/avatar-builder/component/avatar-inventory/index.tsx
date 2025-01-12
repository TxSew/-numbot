import { Box, Stack, useMediaQuery } from '@mui/material';
import { botPartsTab } from '../../configs';
import { useAvatarBuiler } from '../../hook/AvatarBuilerProvider';
import AvatarList from './AvatarList';
import FilterBot from './FilterBot';

export const heightBotInventory = '80vh';

export default function AvatarInventory() {
    const { tabSelect, setTabSelect } = useAvatarBuiler();
    const isSmallScreen = useMediaQuery('(max-width:1285px)');

    return (
        <Stack
            height={heightBotInventory}
            bottom={0}
            sx={{
                position: 'absolute',
                justifyContent: 'flex-end',
                zIndex: 2,
                right: 0,
                width: '40rem',
                backgroundColor: 'rgba(0, 0, 0, .31)',
                paddingLeft: '15px',
                animation: `bb-inventory-animation 3s ease-in-out`,
                height: { xs: '60%', md: '80%', lg: '100%' },
                '@keyframes bb-inventory-animation': {
                    '0%': {
                        transform: 'translateX(120%)',
                    },
                    '100%': {
                        transform: 'translateX(0)',
                    },
                },
                '@media (max-width: 1285px)': {
                    animation: 'none',
                    position: 'relative',
                    display: 'block',
                    right: 0,
                    width: '100%',
                    backgroundColor: 'transparent !important',
                    paddingLeft: 0,
                    zIndex: 2,
                },
                '@media (max-width: 900px)': {
                    mb: '90px',
                },
                '@media (max-width: 600px)': {
                    mb: '66px',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    border: '3px solid #000',
                    maxWidth: '40rem',
                    backgroundColor: tabSelect.bgColor,
                    '@media (max-width: 1285px)': {
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        border: 'none',
                        width: '100%',
                        maxWidth: '100%',
                        height: '100%',
                        backgroundColor: 'transparent !important',
                    },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        right: '100%',
                        backgroundColor: 'rgba(0, 0, 0, .31)',
                        paddingLeft: '15px',
                        paddingBottom: '15px',
                        marginRight: '-3px',
                        borderBottomLeftRadius: '10px',
                        top: '0px',
                        '@media (max-width: 1285px)': {
                            position: 'static',
                            left: 0,
                            right: 'auto',
                            backgroundColor: 'transparent',
                            padding: 0,
                            margin: 0,
                            borderBottomRightRdius: '10px',
                            top: 'auto',
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            width: '100%',
                            px: 1,
                        },
                    }}
                >
                    {botPartsTab.map((e, i) => (
                        <Box
                            key={e.id}
                            sx={{
                                display: 'flex',
                                marginRight: '-15px',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                border: '3px solid #000',
                                borderBottom: i < botPartsTab.length - 1 ? 'none' : '',
                                padding: '10px',
                                borderRight: e.id === tabSelect.id ? 'none' : undefined,
                                backgroundColor: e.bgColor,
                                '@media (max-width: 1285px)': {
                                    position: 'relative',
                                    marginRight: 0,
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    border: '3px solid #000',
                                    padding: '10px',
                                    width: '16.66%',
                                    maxWidth: '100px',
                                    borderTopRightRadius: '10px',
                                    borderTopLeftRadius: '10px',
                                    marginBottom: '-3px',
                                    borderRight: i < botPartsTab.length - 1 ? 'none' : '3px solid #000',
                                },
                            }}
                            onClick={() => {
                                setTabSelect(e);
                            }}
                        >
                            {e.icon}
                        </Box>
                    ))}
                </Box>

                {isSmallScreen ? (
                    <Box
                        sx={{
                            height: '20rem',
                            padding: '5px 0',
                            border: '3px solid #000',
                            backgroundColor: tabSelect.bgColor,
                            overflow: 'hidden',
                            display: 'block',
                        }}
                    >
                        <FilterBot />
                        <AvatarList />
                    </Box>
                ) : (
                    <>
                        <FilterBot />
                        <AvatarList />
                    </>
                )}
            </Box>
        </Stack>
    );
}
