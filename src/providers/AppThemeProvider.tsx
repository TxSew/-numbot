import { ThemeProvider } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { AppThemeModeProvider, useThemeMode } from './AppThemeModeProvider';
import { AppColors, appColors, theme } from '../themes';

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const useColors = useQuery<Partial<AppColors>>({
    queryKey: ['userTheme'],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(appColors);
        }, 0);
      }),
  });

  if (useColors.isLoading) {
    return <></>;
  }

  return (
    <AppThemeModeProvider>
      <ThemeModeProvider colors={useColors.data as Partial<AppColors>} children={children} />
    </AppThemeModeProvider>
  );
};

const ThemeModeProvider = ({
  colors,
  children,
}: {
  colors: Partial<AppColors>;
  children: React.ReactNode;
}) => {
  const { mode, fontFamily } = useThemeMode();

  return (
    <ThemeProvider theme={theme({ colors, mode, fontFamily: fontFamily })}>
      {children}
    </ThemeProvider>
  );
};
