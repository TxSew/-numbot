import { SxProps, Theme } from '@mui/material';
import { appConfig } from '../../../configs/AppConfig';

export interface KeyboardKey {
    imageUrl: string;
    value: string;
}

export interface BorderPopupStyleElement {
    id: (typeof BORDER_POPUP_STYLE_IDS)[number];
    sx: SxProps<Theme>;
}

export interface SettingIosSwitchItem {
    id: (typeof SETTING_IOS_SWITCH_IDS)[number];
    label: string;
    isChecked: boolean;
    icons?: {
        left: React.ReactNode;
        right: React.ReactNode;
    };
}

export const BORDER_POPUP_STYLE_IDS = [
    'border-top',
    'border-left',
    'border-bottom',
    'border-right',
    'badge',
    'angle-top-left',
    'angle-top-right',
    'angle-bottom-left',
    'angle-bottom-right',
] as const;

export const SETTING_IOS_SWITCH_IDS = ['soundEffects', 'answers', 'showTimer', 'vibrations', 'numpadTopRow'] as const;

export const initialKeyboardKeys: KeyboardKey[] = [
    { imageUrl: `${appConfig.url.pathStaticMedia}/pink-key-up.a1d71138.svg`, value: '7' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/dark-blue-key-up.c041996f.svg`, value: '8' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/turquoise-key-up.df3f6a35.svg`, value: '9' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/purple-key-up.19e2a932.svg`, value: '4' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/green-key-up.9591bd92.svg`, value: '5' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/brown-key-up.9693b130.svg`, value: '6' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/orange-key-up.6912aad9.svg`, value: '1' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/light-blue-key-up.6e6e1a6b.svg`, value: '2' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/red-key-up.6220e1e7.svg`, value: '3' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/dark-grey-key-up.70a3bf01.svg`, value: 'Delete' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/light-grey-key-up.2be606ea.svg`, value: '0' },
    { imageUrl: `${appConfig.url.pathStaticMedia}/lime-key-up.35776699.svg`, value: 'Enter' },
];

export const swapItemKeyBoard = (
    keys: KeyboardKey[],
    sourceIndices: number[],
    targetIndices: number[]
): KeyboardKey[] => {
    const updatedKeys = [...keys];
    sourceIndices.forEach((sourceIndex, i) => {
        const targetIndex = targetIndices[i];
        [updatedKeys[sourceIndex], updatedKeys[targetIndex]] = [updatedKeys[targetIndex], updatedKeys[sourceIndex]];
    });
    return updatedKeys;
};

export const borderPopupSettingStyles: BorderPopupStyleElement[] = [
    {
        id: 'border-top',
        sx: {
            position: 'absolute',
            top: 0,
            left: 20,
            width: 'calc(100% - 40px)',
            height: '20px',
            zIndex: 10,
            backgroundRepeat: 'repeat-x',
            backgroundImage: `url('${appConfig.url.pathStaticMedia}/modal-border-top.1ca0aa45.svg')`,
            backgroundSize: 'contain',
        },
    },
    {
        id: 'border-left',
        sx: {
            position: 'absolute',
            top: 20,
            left: 0,
            width: '20px',
            height: 'calc(100% - 40px)',
            zIndex: 10,
            backgroundRepeat: 'repeat-y',
            backgroundImage: `url('${appConfig.url.pathStaticMedia}/modal-border-left.b00a17fa.svg')`,
            backgroundSize: 'contain',
        },
    },
    {
        id: 'border-bottom',
        sx: {
            position: 'absolute',
            bottom: 0,
            left: 20,
            width: 'calc(100% - 40px)',
            height: '20px',
            zIndex: 10,
            backgroundRepeat: 'repeat-x',
            backgroundImage: `url('${appConfig.url.pathStaticMedia}/modal-border-bottom.3dad0b0c.svg')`,
            backgroundSize: 'contain',
        },
    },
    {
        id: 'border-right',
        sx: {
            position: 'absolute',
            right: 0,
            top: 20,
            width: '20px',
            height: 'calc(100% - 40px)',
            zIndex: 10,
            backgroundRepeat: 'repeat-y',
            backgroundImage: `url('${appConfig.url.pathStaticMedia}/modal-border-right.771e3ccc.svg')`,
            backgroundSize: 'contain',
        },
    },
    {
        id: 'badge',
        sx: {
            position: 'absolute',
            opacity: 0.33,
            height: '20px',
            bgcolor: '#FFFFFF',
            borderRadius: 2,
            top: '25px',
            left: '30px',
            right: '30px',
        },
    },
    {
        id: 'angle-top-left',
        sx: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '70px',
            height: '70px',
            zIndex: 10,
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url('${appConfig.url.pathStaticMedia}/modal-angle-top-left.abd850dd.svg')`,
            backgroundSize: 'contain',
        },
    },
    {
        id: 'angle-top-right',
        sx: {
            position: 'absolute',
            top: 0,
            right: 0,
            width: '70px',
            height: '70px',
            zIndex: 10,
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url('${appConfig.url.pathStaticMedia}/modal-angle-top-right.2e3045a6.svg')`,
            backgroundSize: 'contain',
        },
    },
    {
        id: 'angle-bottom-left',
        sx: {
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '70px',
            height: '70px',
            zIndex: 10,
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url('${appConfig.url.pathStaticMedia}/modal-angle-bottom-left.b00a7552.svg')`,
            backgroundSize: 'contain',
        },
    },
    {
        id: 'angle-bottom-right',
        sx: {
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '70px',
            height: '70px',
            zIndex: 10,
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url('${appConfig.url.pathStaticMedia}/modal-angle-bottom-right.2e73c32b.svg')`,
            backgroundSize: 'contain',
        },
    },
];

export const customScrollBox: SxProps<Theme> = {
    '&::-webkit-scrollbar': {
        width: '10px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#586e75',
        borderRadius: '10px',
        border: '2px solid #1c2d33',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#839496',
    },
};
