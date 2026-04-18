export const COLORS = {
  primary: '#FC8019',
  background: '#FFFFFF',
  surface: '#F4F6F9',
  text: '#3D3D3D',
  textSecondary: '#7C7C7C',
  success: '#22C55E',
  error: '#EF4444',
  border: '#E0E0E0',
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  pill: 999,
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: COLORS.text,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: COLORS.text,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: COLORS.text,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: COLORS.text,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: COLORS.text,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: COLORS.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: COLORS.textSecondary,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: COLORS.white,
  },
};
