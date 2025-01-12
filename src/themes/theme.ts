import { createTheme, PaletteOptions } from '@mui/material';
import { appColors, AppColors } from './colors';
import { typography } from './typography';
import { ThemeMode } from '../providers/AppThemeModeProvider';

// Create custom theme mui v6
type CustomThemeProps = Partial<{
  colors: Partial<AppColors>;
  mode: ThemeMode;
  fontFamily: string;
  typography: typeof typography;
}>;

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    cancel: true;
  }
}

export const theme = (props?: CustomThemeProps) => {
  const _colors = { ...appColors, ...props?.colors };

  const lightPalette: PaletteOptions = {
    mode: 'light',
    primary: {
      main: _colors.primary.main,
    },
    secondary: {
      main: _colors.secondary.main,
      light: _colors.secondary.hover, // Optional for light variant
      dark: _colors.secondary.active, // Optional for dark variant
    },
    warning: {
      main: _colors.warning,
    },
    error: {
      main: _colors.danger,
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
  };

  const darkPalette: PaletteOptions = {
    mode: 'dark',
    primary: {
      main: _colors.primary.main,
    },
    secondary: {
      main: _colors.secondary.main,
      light: _colors.secondary.hover, // Optional for light variant
      dark: _colors.secondary.active, // Optional for dark variant
    },
    warning: {
      main: _colors.warning,
    },
    error: {
      main: _colors.danger,
    },
    background: {
      default: '#1b1e1f',
      paper: '#181a1b',
    },
  };

  const palette = props?.mode === 'dark' ? darkPalette : lightPalette;

  return createTheme({
    palette,
    typography: { ...typography, fontFamily: `${props?.fontFamily}, sans-serif` },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontSize: '12px',
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            fontSize: '12px',
          },
          toolbar: {
            fontSize: '12px',
          },
          selectLabel: {
            fontSize: '12px',
          },
          displayedRows: {
            fontSize: '12px',
          },
          select: {
            fontSize: '12px',
          },
          actions: {
            fontSize: '12px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            '&.MuiDialog-paper': {
              backgroundImage: 'unset',
              borderRadius: '12px',
            },
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            backgroundColor: palette.background?.default, // Đặt màu nền tối cho <html>
          },
        },
      },
      MuiButton: {
        defaultProps: {
          size: 'small',
        },
        styleOverrides: {
          root: {
            boxShadow: 'none !important',
            padding: '8px 32px',
            borderWidth: 1,
            borderRadius: 3,
            fontWeight: 400,
          },
          sizeSmall: {
            fontSize: '0.875rem',
            height: '40px',
          },
        },
        variants: [
          {
            props: { variant: 'cancel' },
            style: {
              'padding': '0.6875rem 1rem',
              'lineHeight': '1rem',
              'backgroundColor': appColors.grey300,
              'color': appColors.textPrimary,
              'borderWidth': 1,
              'borderStyle': 'solid',
              'borderColor': appColors.grey300,
              '&:hover': {
                backgroundColor: appColors.grey400,
              },
              '&.Mui-disabled': {
                backgroundColor: '#F3F3F3',
                borderColor: '#F3F3F3',
                color: '#A6A6A6',
              },
            },
          },
        ],
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall .MuiAutocomplete-input': {
              paddingTop: '3.94px',
              paddingBottom: '3.94px',
            },
          },
        },
      },
      MuiTextField: {
        variants: [
          {
            props: { variant: 'outlined', size: 'small' },
            style: {
              '& input': {
                paddingTop: '9.94px',
                paddingBottom: '9.94px',
              },
            },
          },
        ],
        styleOverrides: {
          root: {
            // '& .MuiOutlinedInput-root': {
            //   borderRadius: '3px',
            //   // backgroundColor: 'white',
            //   '& input': {
            //     // padding: '8px 8px 8px 8px',
            //     // fontSize: pxToRem(14),
            //     // lineHeight: '12px',
            //   },
            '& .MuiFormLabel-asterisk': {
              color: appColors.danger,
            },
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTabs-indicator': {
              height: '2px',
              backgroundColor: '#008080',
            },
            '& .MuiTab-root': {
              gap: '8px',
              padding: '16px 16px 8px 16px',
              minHeight: '40px',
            },
            '& button': {
              minHeight: 'auto',
            },
            '&.MuiTabs-root': {
              minHeight: '44px',
            },
            '& .MuiTabs-flexContainer': {
              gap: '24px',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            '& .MuiTab-wrapper > *:first-of-type': {
              marginRight: '8px',
            },
            'fontWeight': 'bold',
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          MenuProps: {
            PaperProps: {
              sx: {
                boxShadow: 'none',
                border: 1,
                borderStyle: 'solid',
                borderColor: _colors.grey300,
                mt: '5px',
              },
            },
            MenuListProps: {},
          },
        },
      },
      MuiPaginationItem: {
        // defaultProps: {
        //     components: {
        //         previous: AiFillCaretLeft,
        //         next: AiFillCaretRight,
        //     },
        // },
        styleOverrides: {
          root: {
            '& svg': {
              width: '10px',
            },
            'border': 'none',
            'fontSize': '1rem',
            'lineHeight': '1.5rem',
            'borderRadius': '7px',

            '&.Mui-selected': {
              backgroundColor: appColors.primary,
            },

            '&.MuiPaginationItem-previousNext': {
              backgroundColor: palette.background?.default,
            },
          },
        },
      },
    },
  });
};
