import { createContext, useContext, useState, useEffect } from 'react';

export enum ThemeMode {
  DARK_MODE = 'dark',
  LIGHT_MODE = 'light',
}

const THEME_MODE_KEY = 'theme_mode';
const THEME_FONT_FAMILY_KEY = 'theme_font_family';

export const fontFamilies = ['Plus Jakarta Sans', 'Montserrat', 'Roboto', 'Inter'];

function useThemeModeContext() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Initialize mode from localStorage or default to LIGHT_MODE
    return (localStorage.getItem(THEME_MODE_KEY) as ThemeMode) || ThemeMode.DARK_MODE;
  });

  const [fontFamily, setFontFamily] = useState<string>(() => {
    // Initialize fontFamily from localStorage or default to the first fontFamily
    return localStorage.getItem(THEME_FONT_FAMILY_KEY) || fontFamilies[0];
  });

  useEffect(() => {
    // Persist mode to localStorage whenever it changes
    localStorage.setItem(THEME_MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    // Persist fontFamily to localStorage whenever it changes
    localStorage.setItem(THEME_FONT_FAMILY_KEY, fontFamily);
  }, [fontFamily]);

  const toggleMode = () => {
    setMode((prevMode) =>
      prevMode === ThemeMode.LIGHT_MODE ? ThemeMode.DARK_MODE : ThemeMode.LIGHT_MODE
    );
  };

  const changeFontFamily = (newFontFamily: string) => {
    if (fontFamilies.includes(newFontFamily)) {
      setFontFamily(newFontFamily);
    }
  };

  return {
    mode,
    setMode,
    toggleMode,
    fontFamilies,
    fontFamily,
    setFontFamily,
    changeFontFamily,
  };
}

type AppThemeModeContextType = ReturnType<typeof useThemeModeContext>;

export const AppThemeModeContext = createContext<AppThemeModeContextType | undefined>(undefined);

export const useThemeMode = (): AppThemeModeContextType => {
  const context = useContext(AppThemeModeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within an AppThemeModeProvider');
  }
  return context;
};

export const AppThemeModeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeMode = useThemeModeContext();

  return (
    <AppThemeModeContext.Provider value={themeMode}>
      {children}
    </AppThemeModeContext.Provider>
  );
};
