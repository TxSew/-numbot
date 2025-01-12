import { ThemeOptions } from '@mui/material';

export const pxToRem = (px: number, baseFontSize: number = 16): string => {
  const rem = px / baseFontSize;
  return `${rem}rem`;
};

export const typography: ThemeOptions['typography'] = {
  fontFamily: 'Plus Jakarta Sans, sans-serif',
  h1: {
    fontSize: pxToRem(40),
    fontWeight: 700,
  },
  h2: {
    fontSize: pxToRem(32),
    fontWeight: 600,
  },
  h3: {
    fontSize: pxToRem(24),
    fontWeight: 600,
  },
  h4: {
    fontSize: pxToRem(20),
    fontWeight: 600,
  },
  h5: {
    fontSize: pxToRem(18),
    fontWeight: 600,
  },
  h6: {
    fontSize: pxToRem(16),
    fontWeight: 600,
  },
  body1: {
    fontSize: pxToRem(14),
    fontWeight: 400,
  },
  body2: {
    fontSize: pxToRem(14),
    fontWeight: 400,
  },
  subtitle1: {
    fontSize: pxToRem(12),
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: pxToRem(10),
    fontWeight: 400,
  },
  button: {
    textTransform: 'none',
    fontSize: pxToRem(14),
    fontWeight: 400,
    boxShadow: 'none',
  },
};
