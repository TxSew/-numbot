import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';
import BotArmLeftIcon from '../../../../assets/icon/bot/BotArmLeftIcon';
import BotArmRightIcon from '../../../../assets/icon/bot/BotArmRightIcon';
import BotBodyIcon from '../../../../assets/icon/bot/BotBodyIcon';
import BotFullBodyIcon from '../../../../assets/icon/bot/BotFullBodyIcon';
import BotHeadIcon from '../../../../assets/icon/bot/BotHeadIcon';
import BotLegsIcon from '../../../../assets/icon/bot/BotLegsIcon';
import { BotConfiguration } from '../../../../components/bot/BotConfiguration';
import { appConfig } from '../../../../configs/AppConfig';
import { ItemType } from '../../../../types/backend';

export type BotPartsTabType = {
    id: number;
    icon: ReactNode;
    bgColor: React.CSSProperties['color'];
    itemType: ItemType;
};

export enum TypeFilter {
    new,
    abc,
    price,
}

export type ActionButtonProps = {
    title: ReactNode;
    styles: SxProps<Theme>;
    onClick: () => void;
};

export type Member = {
    id: number;
    coin_available: number;
    bot_configuration: BotConfiguration;
};

export const botPartsTab: BotPartsTabType[] = [
    {
        id: 1,
        icon: <BotFullBodyIcon />,
        bgColor: '#41BE9F',
        itemType: ItemType.full,
    },
    {
        id: 2,
        icon: <BotHeadIcon />,
        bgColor: '#D81A95',
        itemType: ItemType.head,
    },
    {
        id: 3,
        icon: <BotArmRightIcon />,
        bgColor: '#6F3CA0',
        itemType: ItemType.righthand,
    },
    {
        id: 4,
        icon: <BotArmLeftIcon />,
        bgColor: '#49AFE6',
        itemType: ItemType.lefthand,
    },
    {
        id: 5,
        icon: <BotBodyIcon />,
        bgColor: '#7DCB29',
        itemType: ItemType.body,
    },
    {
        id: 6,
        icon: <BotLegsIcon />,
        bgColor: '#F36918',
        itemType: ItemType.leg,
    },
];

export const cssBorder: SxProps<Theme>[] = [
    {
        backgroundImage: `url(${appConfig.url.pathStaticMedia}/modal-border-top.1ca0aa45.svg)`,
        backgroundRepeat: 'repeat-x',
        width: 'calc(100% - 70px)',
        height: '20px',
        top: 0,
        left: '35px',
    },
    {
        backgroundImage: `url(${appConfig.url.pathStaticMedia}/modal-border-bottom.3dad0b0c.svg)`,
        backgroundRepeat: 'repeat-x',
        width: 'calc(100% - 70px)',
        height: '20px',
        bottom: 0,
        left: '35px',
    },
    {
        backgroundImage: `url(${appConfig.url.pathStaticMedia}/modal-border-left.b00a17fa.svg)`,
        backgroundRepeat: 'repeat-y',
        width: 'calc(100% - 70px)',
        height: '20px',
        top: '35px',
        left: 0,
    },
    {
        backgroundImage: `url(${appConfig.url.pathStaticMedia}/modal-border-left.b00a17fa.svg)`,
        backgroundRepeat: 'repeat-y',
        width: '20px',
        height: 'calc(100% - 70px)',
        top: '35px',
        left: 0,
    },
    {
        background: `url(${appConfig.url.pathStaticMedia}/modal-border-right.771e3ccc.svg)`,
        backgroundRepeat: 'repeat-y',
        width: '20px',
        height: 'calc(100% - 70px)',
        top: '35px',
        right: 0,
    },
    {
        backgroundImage: `url(${appConfig.url.pathStaticMedia}/modal-angle-top-left.abd850dd.svg)`,
        backgroundRepeat: 'no-repeat',
        width: '70px',
        height: '70px',
        top: 0,
        left: 0,
    },
    {
        backgroundImage: `url(${appConfig.url.pathStaticMedia}/modal-angle-top-right.2e3045a6.svg)`,
        backgroundRepeat: 'no-repeat',
        width: '70px',
        height: '70px',
        top: 0,
        right: 0,
    },
    {
        backgroundImage: `url(${appConfig.url.pathStaticMedia}/modal-angle-bottom-left.b00a7552.svg)`,
        backgroundRepeat: 'no-repeat',
        width: '70px',
        height: '70px',
        bottom: 0,
        left: 0,
    },
    {
        backgroundImage: `url(${appConfig.url.pathStaticMedia}/modal-angle-bottom-left.b00a7552.svg)`,
        backgroundRepeat: 'no-repeat',
        width: '70px',
        height: '70px',
        bottom: 0,
        left: 0,
    },
    {
        backgroundImage: `url(${appConfig.url.pathStaticMedia}/modal-angle-bottom-right.2e73c32b.svg)`,
        backgroundRepeat: 'no-repeat',
        width: '70px',
        height: '70px',
        bottom: 0,
        right: 0,
    },
];
