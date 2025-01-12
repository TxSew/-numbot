export const appColors = {
  light: {
    main: '#E9F4F4',
    hover: '#DDEEEE',
    active: '#B9DCDC',
  },
  primary: {
    main: '#1E8F8E',
    hover: '#1B8180',
    active: '#1B8180',
  },
  secondary: {
    main: '#FF9800', // A vibrant orange that complements teal
    hover: '#FB8C00', // Slightly darker for hover
    active: '#EF6C00', // Deeper shade for active
  },
  dark: {
    main: '#176B6B',
    hover: '#125655',
    active: '#0D4040',
  },

  textPrimary: '#292929',

  white: '#FFFFFF',
  grey100: '#FAFAFA',
  grey200: '#EEEEEE',
  grey300: '#DDDDDD',
  grey400: '#C5C5C5',
  grey500: '#BFBFBF',
  grey600: '#85858A',

  success: '#009D4F',
  successLight: '#009D4F10',

  warning: '#FFB600',
  warningLight: '#FFB60010',

  danger: '#E01B00',
  dangerLight: '#E01B0010',
  dangerDark: '#BE1700',

  linkPrimary: '#007BFF',
  linkLight: '#007BFF10',
  textDesc: '#6B6B6B',

  backgroundChat: 'rgba(245, 248, 255, 1)',
};

export type AppColors = typeof appColors;
