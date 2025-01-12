import { Box, Stack, useMediaQuery } from '@mui/material';
import { useMemo, useState } from 'react';
import { heightBotInventory } from '.';
import { fullScreen } from '../..';
import { IAvatar, IAvatarItem, ItemType } from '../../../../../types/backend';
import { useAvatarBuiler } from '../../hook/AvatarBuilerProvider';
import PopupAvatarItems from '../PopupAvatarItems';
import AvatarItem from './AvatarItem';

export default function AvatarList() {
    const { parts, full, currentMember, isBody, isFullBody, handleSelectAvatar } = useAvatarBuiler();

    const isSmallScreen = useMediaQuery('(max-width:1285px)');

    const [openPopupBotItems, setOpenPopupBotItems] = useState(false);
    const [openPopupBotItemsDuplicate, setOpenPopupBotItemsDuplicate] = useState(false);
    const [chooseAvatarItem, setChooseAvatarItem] = useState({} as IAvatarItem);
    const [chooseAvatar, setChooseAvatar] = useState({} as IAvatar);

    const viewportHeight = window.innerHeight;

    const maxScroll = useMemo(
        () => (parseFloat(heightBotInventory) / 100) * viewportHeight,
        [heightBotInventory, viewportHeight]
    );

    const renderBotPartItems = () => {
        return isFullBody
            ? full.map((e, i) => {
                  return (
                      <AvatarItem
                          key={i}
                          bought={true}
                          canBuy={false}
                          isBody={isBody}
                          isFullBody={isFullBody}
                          avatarItem={{
                              id: e.id,
                              name: e.name,
                              imageURL: e.imageURL,
                              bought: true,
                              itemType: ItemType.body,
                              price: e.price,
                          }}
                          onSelectPart={() => {
                              setOpenPopupBotItems(true);
                              setChooseAvatar(e);
                          }}
                      />
                  );
              })
            : parts.map((e, i) => {
                  const bought = !Boolean(e.price) || e.bought;
                  const canBuy = currentMember.coin_available >= (e.price ? Number(e.price) : 0);

                  return (
                      <AvatarItem
                          key={i}
                          bought={bought}
                          canBuy={canBuy}
                          isBody={isBody}
                          isFullBody={isFullBody}
                          avatarItem={e}
                          onSelectPart={() => {
                              if (!isFullBody && bought) {
                                  handleSelectAvatar(e.itemType, e.imageURL, [e.id]);
                                  return;
                              }
                              setOpenPopupBotItems(true);
                              setChooseAvatarItem(e);
                          }}
                      />
                  );
              });
    };

    return (
        <Stack direction={'row'} overflow={'hidden'}>
            <Box
                position="relative"
                overflow="hidden"
                sx={{
                    ...fullScreen,
                }}
            >
                <Box
                    position="absolute"
                    overflow="scroll"
                    marginRight="-19px"
                    marginBottom="-19px"
                    sx={{
                        inset: '0px',
                        overflowX: 'hidden',
                        '@media (max-width: 1285px)': {
                            position: 'inherit',
                            overflowX: 'auto',
                        },
                    }}
                >
                    {isSmallScreen ? (
                        <Stack direction={'row'} height={'15rem'} mb={2}>
                            {renderBotPartItems()}
                        </Stack>
                    ) : (
                        <Box position="relative" minHeight="100%">
                            <Stack direction="row" justifyContent="flex-start" flexWrap="wrap" padding="10px">
                                {renderBotPartItems()}
                            </Stack>
                        </Box>
                    )}
                </Box>
            </Box>

            <Box
                sx={{
                    marginTop: '20px',
                    marginRight: '0px',
                    height: maxScroll + 15,
                    position: 'relative',
                    width: 0,
                    display: isSmallScreen ? 'none' : 'inherit',
                }}
            ></Box>

            {openPopupBotItems && (
                <PopupAvatarItems
                    openPopup={openPopupBotItems}
                    onSetOpenPopup={setOpenPopupBotItems}
                    avatarItem={chooseAvatarItem}
                    avatar={
                        isFullBody
                            ? {
                                  data: chooseAvatar,
                                  canBuyAvatarItem: (e) => {
                                      setOpenPopupBotItemsDuplicate(true);
                                      setChooseAvatarItem(e);
                                  },
                              }
                            : undefined
                    }
                />
            )}

            {openPopupBotItemsDuplicate && (
                <PopupAvatarItems
                    openPopup={openPopupBotItemsDuplicate}
                    onSetOpenPopup={(value) => {
                        setOpenPopupBotItemsDuplicate(value);
                        if (!value) {
                            setOpenPopupBotItems(true);
                        }
                    }}
                    avatarItem={chooseAvatarItem}
                />
            )}
        </Stack>
    );
}
