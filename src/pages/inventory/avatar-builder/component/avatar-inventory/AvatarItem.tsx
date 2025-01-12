import { Box, Stack, Typography } from '@mui/material';
import { fullScreen } from '../..';
import { appConfig } from '../../../../../configs/AppConfig';
import { appColors } from '../../../../../themes';
import { useAvatarBuiler } from '../../hook/AvatarBuilerProvider';
import { IAvatarItem } from '../../../../../types/backend';

type Props = {
    isFullBody: Boolean;
    canBuy: Boolean;
    bought: Boolean;
    isBody: Boolean;
    onSelectPart: () => void;
    avatarItem: IAvatarItem;
};

export default function AvatarItem({ isFullBody, isBody, canBuy, bought, onSelectPart, avatarItem }: Props) {
    const { currentMember } = useAvatarBuiler();
    const { bot_configuration } = currentMember;

    return (
        <Stack
            width={isFullBody ? '48%' : '23%'}
            maxWidth={'unset'}
            position="relative"
            margin={'1%'}
            border={'3px solid transparent'}
            borderRadius="10px"
            sx={{
                cursor: 'pointer',
                '&:hover': {
                    bgcolor: bought ? '#29abe2' : canBuy ? '#0f0' : 'red',
                },
                '&:hover .bot-footer': {
                    bgcolor: bought ? '#29abe2' : canBuy ? '#0f0' : 'red',
                },
                '@media (max-width: 1285px)': {
                    width: '150px',
                },
            }}
            onClick={() => onSelectPart()}
        >
            <Stack
                alignItems="center"
                justifyContent="center"
                flex="0 1"
                bgcolor={appColors.white}
                minHeight="50px"
                textAlign="center"
                border={'3px solid #000'}
                style={{
                    borderTopRightRadius: '7px',
                    borderTopLeftRadius: '7px',
                }}
            >
                <Typography variant="body1" color={'#111a1c'} fontWeight={600}>
                    {avatarItem?.name}
                </Typography>
            </Stack>
            <Stack
                alignItems="center"
                justifyContent="center"
                flex="1 1"
                minHeight={isFullBody ? ' 240px' : '120px'}
                borderLeft="3px solid #000"
                borderRight="3px solid #000"
                sx={{
                    background: '-webkit-gradient(linear, left top, left bottom, from(#131e20), to(#4c6d74))',
                    '@media (max-width: 1285px)': {
                        minHeight: '120px',
                    },
                }}
            >
                <Box
                    minHeight={isFullBody ? ' 200px' : '120px'}
                    minWidth={isFullBody ? ' 200px' : '150px'}
                    sx={{
                        background: `url(${avatarItem.imageURL})`,
                        backgroundPosition: '50%',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: isBody ? '100px auto' : 'contain',
                        transition: 'background-size 0.3s ease',
                        ...fullScreen,
                        '@media (max-width: 1285px)': {
                            minHeight: '120px',
                            minWidth: '120px',
                        },
                    }}
                />
            </Stack>
            <Box
                className="bot-footer"
                display={'flex'}
                paddingBottom="5px"
                paddingRight="5px"
                zIndex={2}
                bgcolor={'#d2d2d1'}
                flex="1 1"
                minHeight="50px"
                alignItems="center"
                justifyContent="center"
                border={'3px solid #000'}
                sx={{
                    borderBottomRightRadius: '7px',
                    borderBottomLeftRadius: '7px',
                }}
            >
                <Box
                    className="bot-footer"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: '1 1',
                        backgroundColor: appColors.white,
                        borderBottomRightRadius: '5px',
                        borderBottomLeftRadius: '5px',
                        ...fullScreen,
                    }}
                >
                    {!isFullBody && Object.values(bot_configuration).some((part) => part.id === avatarItem.id) ? (
                        <img
                            style={{
                                height: '50px',
                                width: 'auto',
                                marginTop: '-10px',
                            }}
                            src={`${appConfig.url.pathStaticMedia}/tick.92de9850.svg`}
                        />
                    ) : (
                        <>
                            {!isFullBody && !bought && (
                                <img
                                    src={`${appConfig.url.pathStaticMedia}/coins-no-shadow.c72ab52b.svg`}
                                    style={{
                                        position: 'absolute',
                                        width: '45px',
                                        height: 'auto',
                                        left: '-7px',
                                        bottom: '-9px',
                                    }}
                                />
                            )}

                            <Typography variant="body1" color={'#111a1c'} fontWeight={600}>
                                {isFullBody ? 'View' : avatarItem.price && !bought ? avatarItem.price : ''}
                            </Typography>
                        </>
                    )}
                </Box>
            </Box>
        </Stack>
    );
}
