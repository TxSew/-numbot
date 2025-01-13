import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChallengeIcon from '../../assets/icon/icon-tsx/ChallengeIcon';
import StoryIcon from '../../assets/icon/icon-tsx/StoryIcon';
import GameAppBar from '../../components/game-appbar';
import { appConfig } from '../../configs/AppConfig';
import HangingBar from './components/HangingBar';

export default function GameStagePage() {
    const navigate = useNavigate();

    return (
        <Stack direction={'column'}>
            <Stack alignItems={'center'}>
                <GameAppBar />
                <HangingBar label="Game modes" />
                <Box
                    sx={{
                        backgroundImage: `url(${appConfig.url.pathStaticMedia}/todays-data-button.b8fc1574.svg)`,
                        width: '224px',
                        backgroundRepeat: 'no-repeat',
                        height: '90.3px',
                        cursor: 'pointer',
                        backgroundPosition: 'center',
                        transition: 'filter 0.3s ease',
                        '&:hover': {
                            filter: `
                                drop-shadow(0 0 5px rgba(64, 224, 208, 0.7))
                                drop-shadow(0 0 7px rgba(64, 224, 208, 0.5))
                            `,
                        },
                    }}
                >
                    <Typography
                        variant="caption"
                        marginLeft={'5.56rem'}
                        mt={'2.1rem'}
                        display={'inline-block'}
                        fontSize={16}
                        fontWeight={'bold'}
                    >
                        Game Data
                    </Typography>
                </Box>
            </Stack>
            <Stack direction={'row'} width={'100%'} justifyContent={'center'} mt={4} flexWrap={'wrap'}>
                <Box
                    onClick={() => {
                        navigate('story');
                    }}
                >
                    <StoryIcon />
                </Box>
                {/* <Box
                    onClick={() => {
                        navigate('challenge');
                    }}
                >
                    <ChallengeIcon />
                </Box> */}
            </Stack>
        </Stack>
    );
}
