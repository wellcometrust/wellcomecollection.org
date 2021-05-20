import { keyframes } from 'styled-components';

type ColorVariant = 'base' | 'light' | 'dark';

export const spacingUnits = {
  '1': 4,
  '2': 6,
  '3': 8,
  '4': 12,
  '5': 16,
  '6': 24,
  '7': 30,
  '8': 32,
  '9': 46,
  '10': 64,
};

export const themeValues = {
  spacingUnit: 6,
  borderRadiusUnit: 6,
  transitionProperties: '150ms ease',
  sizes: {
    small: 0,
    medium: 600,
    large: 960,
    xlarge: 1338,
  },
  gutter: {
    small: 18,
    medium: 24,
    large: 30,
    xlarge: 30,
  },
  colors: {
    white: { base: '#ffffff', dark: '', light: '' },
    black: { base: '#010101', dark: '', light: '' },
    viewerBlack: { base: '#121212', dark: '', light: '' },
    purple: { base: '#944aa0', dark: '', light: '' },
    teal: { base: '#006272', dark: '', light: '' },
    cyan: { base: '#298187', dark: '', light: '' },
    turquoise: { base: '#5cb8bf', dark: '', light: '' },
    red: { base: '#e01b2f', dark: '', light: '' },
    orange: { base: '#e87500', dark: '', light: '' },
    yellow: { base: '#ffce3c', dark: '', light: '#fff5d8' },
    brown: { base: '#815e48', dark: '', light: '' },
    cream: { base: '#f0ede3', dark: '', light: '' },
    green: { base: '#00786c', dark: '#146a5c', light: '' },
    charcoal: { base: '#323232', dark: '#2e2e2e', light: '' },
    pewter: { base: '#6b6b6b', dark: '', light: '' },
    silver: { base: '#8f8f8f', dark: '', light: '' },
    marble: { base: '#bcbab5', dark: '', light: '' },
    pumice: { base: '#d9d6ce', dark: '', light: '' },
    smoke: { base: '#e8e8e8', dark: '', light: '' },
    // The following 'black' is only to be used for the item viewer
    coal: { base: '#1f1f1f', dark: '', light: '' },
    //
    transparent: {
      base: 'transparent',
      dark: 'transparent',
      light: 'transparent',
    },
    'transparent-black': {
      base: 'rgba(29, 29, 29, 0.61)',
      dark: '',
      light: '',
    },
    // Opacity value explanation; We use transparent to provide a background to white text which overlays a variety of images (therefore unknown colour contrast).  This opacity is the lightest we can go, while still providing sufficient contrast to pass WCAG guidlines, when it is displayed above a white background, i.e. worst case scenario.
    inherit: { base: 'inherit', dark: '', light: '' },
    currentColor: { base: 'currentColor', dark: '', light: '' },
  },

  // Keyboard focus uses a hard box shadow of 0.7 opacity 'turquoise'
  focusBoxShadow: '0 0 0 3px rgba(92, 184, 191, 0.7)',
  keyframes: {
    hoverBounce: keyframes`
      0% {
        top: 0;
        animation-timing-function: ease-in;
      }

      50% {
        top: -0.4em;
        animation-timing-function: ease-out;
      }

      100% {
        top: 0;
      }
      `,
  },
  spacingUnits,
  spaceAtBreakpoints: {
    small: {
      xs: spacingUnits['1'],
      s: spacingUnits['2'],
      m: spacingUnits['3'],
      l: spacingUnits['5'],
      xl: spacingUnits['7'],
    },
    medium: {
      xs: spacingUnits['1'],
      s: spacingUnits['2'],
      m: spacingUnits['4'],
      l: spacingUnits['6'],
      xl: spacingUnits['9'],
    },
    large: {
      xs: spacingUnits['1'],
      s: spacingUnits['3'],
      m: spacingUnits['5'],
      l: spacingUnits['8'],
      xl: spacingUnits['10'],
    },
  },
  color(name: string, variant: ColorVariant = 'base'): string {
    return this.colors[name][variant];
  },
};
