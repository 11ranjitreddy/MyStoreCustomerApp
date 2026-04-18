import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { COLORS, RADIUS, SPACING } from '../theme/theme';
import { Typography } from './Typography';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'outline' | 'text';
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  loading = false,
  fullWidth = false,
  style,
  onPress,
  disabled,
  ...props
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], width: fullWidth ? '100%' : 'auto' }}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled || loading}
        style={[
          styles.button,
          isPrimary && styles.primary,
          isOutline && styles.outline,
          fullWidth && styles.fullWidth,
          disabled && styles.disabled,
          style,
        ]}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.primary} />
        ) : (
          <Typography
            variant="button"
            color={isPrimary ? COLORS.white : COLORS.primary}
          >
            {label}
          </Typography>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: RADIUS.pill,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: COLORS.gray300,
    borderColor: COLORS.gray300,
  },
});
