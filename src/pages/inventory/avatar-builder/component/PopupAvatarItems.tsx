import { Box, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import { appConfig } from '../../../../configs/AppConfig';
import { appColors } from '../../../../themes';
import { IAvatar, IAvatarItem, ItemType } from '../../../../types/backend';
import { useAvatarBuiler } from '../hook/AvatarBuilerProvider';
import AvatarItem from './avatar-inventory/AvatarItem';

type Props = {
    openPopup: true;
    onSetOpenPopup: (value: boolean) => void;
    avatarItem: IAvatarItem;
    avatar?: {
        data: IAvatar;
        canBuyAvatarItem: (e: IAvatarItem) => void;
    };
};

export default function PopupAvatarItems(props: Props) {
    const { openPopup, onSetOpenPopup, avatarItem, avatar } = props;

    const { currentMember, handleSelectAvatar } = useAvatarBuiler();

    const bought = !Boolean(avatarItem?.price) || avatarItem?.bought;
    const canBuy = currentMember.coin_available >= Number(avatarItem?.price);

    return (
        <Dialog
            open={!!openPopup}
            onClose={() => {
                onSetOpenPopup(false);
            }}
            fullScreen
            PaperProps={{
                sx: {
                    boxShadow: 'none',
                    backgroundColor: 'rgba(0, 0, 0, .8)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: undefined, sm: 'center' },
                    justifyContent: 'center',
                },
            }}
        >
            <DialogTitle sx={{ textAlign: 'center', p: 0 }}>
                <img
                    src={`${appConfig.url.pathStaticMedia}/close-panel-cross.daaee7cb.svg`}
                    alt=""
                    style={{
                        width: '50px',
                        height: '50px',
                        cursor: 'pointer',
                        margin: '0 auto',
                    }}
                    onClick={() => onSetOpenPopup(false)}
                />
            </DialogTitle>

            {avatar ? (
                <Stack justifyContent="center" p={{ xs: 1, md: 0 }}>
                    <Typography color={appColors.white} fontSize={{ xs: '24px', sm: '32px' }} textAlign={'center'}>
                        Hi, I'm {avatar.data.name}! Get my parts now!
                    </Typography>

                    <Stack justifyContent={'space-between'} direction={'row'} overflow="hidden">
                        <Stack
                            width={'30%'}
                            alignItems={'center'}
                            display={{
                                xs: 'none',
                                md: 'inherit',
                            }}
                        >
                            <img
                                src={avatar.data.imageURL}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Stack>

                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            spacing={{ xs: 0, md: 2 }}
                            rowGap={2}
                            maxWidth={'60%'}
                            padding="10px"
                            sx={{
                                '@media (max-width: 900px)': {
                                    flexWrap: 'nowrap',
                                    overflow: 'scroll',
                                    maxWidth: '100%',
                                    justifyContent: 'start',
                                },
                            }}
                        >
                            {avatar.data.avatarItems.map((e) => {
                                const itemWithPartName = { ...e, name: avatar.data.name };
                                const bought = !Boolean(e?.price) || e.bought;
                                const canBuy = currentMember.coin_available >= Number(e?.price);
                                return (
                                    <AvatarItem
                                        key={e.id}
                                        bought={bought}
                                        canBuy={canBuy}
                                        isBody={e.itemType == ItemType.body}
                                        isFullBody={false}
                                        avatarItem={itemWithPartName}
                                        onSelectPart={() => {
                                            if (e.bought) {
                                                onSetOpenPopup(false);
                                                handleSelectAvatar(e.itemType, e.imageURL, [e.id]);

                                                return;
                                            }

                                            if (canBuy) {
                                                avatar.canBuyAvatarItem(e);
                                                onSetOpenPopup(false);
                                            }
                                        }}
                                    />
                                );
                            })}
                        </Stack>
                    </Stack>
                </Stack>
            ) : (
                <Stack
                    justifyContent="center"
                    alignItems={'center'}
                    spacing={{ xs: 0, md: 4 }}
                    padding="10px"
                    textAlign={'center'}
                >
                    <Typography color={canBuy ? appColors.white : appColors.danger} fontSize={'32px'}>
                        {canBuy
                            ? 'Are you sure you want to purchase this item?'
                            : ' Not enough coins to purchase this part'}
                    </Typography>

                    <AvatarItem
                        bought={bought ?? false}
                        canBuy={canBuy}
                        isBody={avatarItem.itemType == ItemType.body}
                        isFullBody={Boolean(avatar)}
                        avatarItem={avatarItem}
                        onSelectPart={() => {}}
                    />

                    {canBuy && (
                        <button
                            style={{
                                position: 'relative',
                                width: '17rem',
                                height: '4rem',
                                marginTop: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                backgroundPosition: '50%',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: 'transparent',
                                border: 'none',
                                paddingBottom: '6px',
                                backgroundImage: `url(/assets/images/button-purchase.png)`,
                            }}
                            onClick={() => {
                                onSetOpenPopup(false);
                                handleSelectAvatar(avatarItem.itemType, avatarItem.imageURL, [avatarItem.id]);
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    margin: 'auto',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        width: '60px',
                                        height: '60px',
                                        left: '-28px',
                                        bottom: '2px',
                                        backgroundImage: `url(${appConfig.url.pathStaticMedia}/coins.9f256d40.png)`,
                                        marginRight: '0.5rem',
                                        backgroundPosition: '50%',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'contain',
                                    }}
                                />
                                Purchase
                            </Box>
                        </button>
                    )}
                </Stack>
            )}
        </Dialog>
    );
}
