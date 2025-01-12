import { appConfig } from "../../configs/AppConfig";

export enum PartsBotProgress {
    LEGS = 'legs',
    TORSO = 'torso',
    RIGHT_ARM = 'right-arm',
    LEFT_ARM = 'left-arm',
    HEAD = 'head',
}

export const PARTS_CONFIG: PartsBotProgress[] = [
    PartsBotProgress.LEGS,
    PartsBotProgress.TORSO,
    PartsBotProgress.RIGHT_ARM,
    PartsBotProgress.LEFT_ARM,
    PartsBotProgress.HEAD,
];

export const getPartImage = (part: PartsBotProgress, isUnlocked: boolean, stageName: string): string => {
    return `${appConfig.url.pathBotProgress}/${stageName}-${part}${isUnlocked ? '' : '-shaded'}.svg`;
};

export const getUnlockedParts = (playerLevel: number, totalLevel: number): boolean[] => {
    const levelPerPart = totalLevel / PARTS_CONFIG.length;
    return PARTS_CONFIG.map((_, index) => playerLevel >= levelPerPart * (index + 1));
};

