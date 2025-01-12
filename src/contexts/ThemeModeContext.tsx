import { Box, FormControlLabel, Switch } from '@mui/material';
import { ThemeMode, useThemeMode } from '../providers/AppThemeModeProvider';

export function ThemeModeToggle() {
  const { setMode, mode } = useThemeMode();

  const handleToggle = () => {
    setMode(mode == ThemeMode.DARK_MODE ? ThemeMode.LIGHT_MODE : ThemeMode.DARK_MODE);
  };

  return (
    <Box sx={{ padding: 2, borderTop: '1px solid lightgrey' }}>
      <FormControlLabel
        control={<Switch checked={mode === ThemeMode.DARK_MODE} onChange={handleToggle} color="primary" />}
        label={mode === ThemeMode.LIGHT_MODE ? 'Light Mode' : 'Dark Mode'}
      />
    </Box>
  );
}
