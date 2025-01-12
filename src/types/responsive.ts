export type DeviceSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BreakpointWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BreakpointHeight = 'short' | 'medium' | 'tall';

export type ResponsiveWidth = {
    [key in DeviceSize]: string;
};

export type ResponsiveSize = {
    [key in DeviceSize]: string | number;
};

export const BREAKPOINTS = {
    xs: 0,
    sm: 500,
    md: 900,
    lg: 1200,
    xl: 1536,
} as const;

export const heightBreakpoints = {
    short: 650,
    medium: 960,
    tall: 1200,
} as const;
