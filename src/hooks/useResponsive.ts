import { useTheme, useMediaQuery, Breakpoint } from '@mui/material';
import { BREAKPOINTS, DeviceSize } from '../types/responsive';

type QueryType = 'up' | 'down' | 'between' | 'only';
type BreakpointKey = Breakpoint | number;

export default function useResponsive(query: QueryType, start: BreakpointKey, end?: BreakpointKey) {
    const theme = useTheme();

    if (start === 'xs') {
        return useMediaQuery(`(max-width:${BREAKPOINTS.sm - 1}px)`);
    }

    const mediaUp = useMediaQuery(theme.breakpoints.up(start));
    const mediaDown = useMediaQuery(theme.breakpoints.down(start));
    const mediaBetween = end ? useMediaQuery(theme.breakpoints.between(start, end)) : null;
    const mediaOnly = useMediaQuery(theme.breakpoints.only(start as Breakpoint));

    switch (query) {
        case 'up':
            return mediaUp;
        case 'down':
            return mediaDown;
        case 'between':
            return mediaBetween;
        case 'only':
            return mediaOnly;
        default:
            return null;
    }
}

export function useExtraSmall() {
    return useResponsive('only', 'xs');
}

export function useMobile() {
    return useResponsive('down', 'sm');
}

export function useTablet() {
    return useResponsive('between', 'sm', 'md');
}

export function useDesktop() {
    return useResponsive('up', 'lg');
}

export function useSmallerThan(breakpoint: DeviceSize) {
    return useResponsive('down', breakpoint);
}

export function useLargerThan(breakpoint: DeviceSize) {
    return useResponsive('up', breakpoint);
}
