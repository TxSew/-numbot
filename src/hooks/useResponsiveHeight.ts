import { BreakpointHeight, heightBreakpoints } from '../types/responsive';

export const useResponsiveHeight = (breakpoint: BreakpointHeight): boolean => {
    const height = window.innerHeight;

    switch (breakpoint) {
        case 'short':
            return height <= heightBreakpoints.short;
        case 'medium':
            return height <= heightBreakpoints.medium && height > heightBreakpoints.short;
        case 'tall':
            return height > heightBreakpoints.medium;
        default:
            return false;
    }
};
