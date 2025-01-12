import { Box, Stack, Typography } from '@mui/material';
import FilterAllIcon from '../../../../../assets/icon/icon-tsx/FilterAllIcon';
import FilterCreaturesIcon from '../../../../../assets/icon/icon-tsx/FilterCreaturesIcon';
import FilterHumanIcon from '../../../../../assets/icon/icon-tsx/FilterHumanIcon';
import FilterMachinesIcon from '../../../../../assets/icon/icon-tsx/FilterMachinesIcon';
import FilterOtherIcon from '../../../../../assets/icon/icon-tsx/FilterOtherIcon';
import FilterOwnedIcon from '../../../../../assets/icon/icon-tsx/FilterOwnedIcon';
import FilterRustDiamondIcon from '../../../../../assets/icon/icon-tsx/FilterRustDiamondIcon';
import FilterSeasonalIcon from '../../../../../assets/icon/icon-tsx/FilterSeasonalIcon';
import usePopUp from '../../../../../hooks/usePopUp';
import { GropupType } from '../../../../../types/backend';
import { ActionButtonProps, TypeFilter } from '../../configs';
import { useAvatarBuiler } from '../../hook/AvatarBuilerProvider';
import PopupFilterAvatar from '../PopupFilterAvatar';

export default function FilterBot() {
    const { sortAvatars, filterType } = useAvatarBuiler();

    const popupFilterAvatar = usePopUp();

    const listActionButton: ActionButtonProps[] = [
        {
            title: 'NEW',
            styles: {
                backgroundColor: '#d30082',
            },
            onClick: () => {
                sortAvatars(TypeFilter.new);
            },
        },
        {
            title: 'ABC',
            styles: {
                backgroundColor: '#d30082',
            },
            onClick: () => {
                sortAvatars(TypeFilter.abc);
            },
        },
        {
            title: '£',
            styles: {
                backgroundColor: '#d30082',
            },
            onClick: () => {
                sortAvatars(TypeFilter.price);
            },
        },
    ];

    const filterIcon = (type: GropupType) => {
        switch (type) {
            case GropupType.Human:
                return <FilterHumanIcon width={25} height={15} />;
            case GropupType.Creatures:
                return <FilterCreaturesIcon width={25} height={15} />;
            case GropupType.Machines:
                return <FilterMachinesIcon width={25} height={15} />;
            case GropupType.Seasonal:
                return <FilterSeasonalIcon width={25} height={15} />;
            case GropupType.Others:
                return <FilterOtherIcon width={25} height={15} />;
            case GropupType.RustToDiamond:
                return <FilterRustDiamondIcon width={25} />;
            case GropupType.Owned:
                return <FilterOwnedIcon width={20} />;
            default:
                return <></>;
        }
    };

    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            sx={{
                width: '100%',
                padding: { xs: '5px', lg: '1rem' },
                fontSize: '16px',
                '@media (max-width: 1285px)': {
                    padding: '5px',
                },
            }}
        >
            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={{ xs: 0, md: 2 }}
                sx={{
                    '@media (max-width: 1285px)': {
                        flexDirection: 'column',
                    },
                }}
            >
                <Typography fontWeight={'bold'} fontSize={{ xs: '12px', sm: '14px' }}>
                    SORT:
                </Typography>
                <Stack direction={'row'} alignItems={'center'} spacing={{ xs: 1, md: 3 }}>
                    {listActionButton.map((e, i) => (
                        <ActionButton key={i} title={e.title} styles={e.styles} onClick={e.onClick} />
                    ))}
                </Stack>
            </Stack>

            <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={{ xs: 0, md: 2 }}
                sx={{
                    '@media (max-width: 1285px)': {
                        flexDirection: 'column',
                    },
                }}
            >
                <Typography fontWeight={'bold'} fontSize={{ xs: '12px', sm: '14px' }}>
                    FILTER:
                </Typography>
                <Box>
                    <ActionButton
                        title={filterType ? filterIcon(filterType) : <FilterAllIcon width={25} />}
                        styles={{
                            backgroundColor: '#00abe0',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.4em 1.5em',
                        }}
                        onClick={() => {
                            popupFilterAvatar.setTrue();
                        }}
                    />

                    <PopupFilterAvatar {...popupFilterAvatar} />
                </Box>
            </Stack>
        </Stack>
    );
}

const ActionButton = ({ title, styles, onClick }: ActionButtonProps) => (
    <Box
        sx={{
            position: 'relative',
            cursor: 'pointer',
            padding: '0.2em 1em',
            margin: '0 0.5em',
            border: '2px solid #1d1d1b',
            borderRadius: '9px',
            overflow: 'hidden',
            backgroundColor: 'transparent',
            '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                borderRadius: '5.5px',
                boxShadow: 'inset 3px 3px 0 0 rgba(0, 0, 0, 0.15)',
            },
            ...styles,
        }}
        onClick={onClick}
    >
        {typeof title === 'string' || typeof title === 'number' ? (
            <Typography fontWeight={'bold'}>{title}</Typography>
        ) : (
            title
        )}
    </Box>
);
