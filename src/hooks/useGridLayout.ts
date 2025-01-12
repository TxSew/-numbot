import useResponsive from './useResponsive';
import { useResponsiveHeight } from './useResponsiveHeight';

interface GridLayout {
    itemsPerPage: number;
    itemWidth: string;
}

export const useGridLayout = (): GridLayout => {
    const isMobile = useResponsive('down', 'sm');
    const isTablet = useResponsive('between', 'sm', 'md');
    const isMediumHeight = useResponsiveHeight('medium');

    const getLayout = (): GridLayout => {
        if (isMediumHeight) {
            if (isMobile) return { itemsPerPage: 10, itemWidth: '20%' };
            if (isTablet) return { itemsPerPage: 12, itemWidth: '20%' };
            return { itemsPerPage: 20, itemWidth: '20%' };
        }

        if (isMobile) return { itemsPerPage: 12, itemWidth: '20%' };
        if (isTablet) return { itemsPerPage: 16, itemWidth: '20%' };
        return { itemsPerPage: 25, itemWidth: '20%' };
    };

    return getLayout();
};
