import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { TYPOGRAPHY } from '../theme/theme';

interface TypographyProps extends TextProps {
  variant?: keyof typeof TYPOGRAPHY;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color,
  align,
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        TYPOGRAPHY[variant],
        color ? { color } : {},
        align ? { textAlign: align } : {},
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};
