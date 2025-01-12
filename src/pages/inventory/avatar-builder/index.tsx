import { Box } from '@mui/material';
import BotConfiguration from '../../../components/bot/BotConfiguration';
import GameAppBar from '../../../components/game-appbar';
import AvatarInventory from './component/avatar-inventory';
import useAvatarBuilerContext, { AvatarBuilerContext } from './hook/AvatarBuilerProvider';

export default function AvatarBuilderPage() {
    const botBuilerContext = useAvatarBuilerContext();
    const { currentMember } = botBuilerContext;
    return (
        <AvatarBuilerContext.Provider value={botBuilerContext}>
            <GameAppBar />
            <Box
                overflow={'hidden'}
                position={'relative'}
                sx={{
                    ...fullScreen,
                    '@media (max-width: 1285px)': {
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    },
                }}
            >
                <BotConfiguration
                    botConfig={currentMember.bot_configuration}
                    sxProps={{
                        mt: 4,
                        width: '70%',
                        animation: `bb-user-bot-animation 3s ease-in-out`,
                        '@keyframes bb-user-bot-animation': {
                            '0%': {
                                width: '100%',
                            },
                            to: {
                                width: '70%',
                            },
                        },
                        '@media (max-width: 1285px)': {
                            width: '100%',
                            paddingBottom: 0,
                            alignItems: 'flex-start',
                            animation: 'none',
                        },
                    }}
                />

                <AvatarInventory />
            </Box>
        </AvatarBuilerContext.Provider>
    );
}

export const fullScreen: React.CSSProperties = {
    width: '100%',
    height: '100%',
};
