import React from 'react';
import { View, StyleSheet, StatusBar, ViewProps } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenWrapperProps extends ViewProps {
  withPadding?: boolean;
  backgroundColor?: string;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  withPadding = true,
  backgroundColor = COLORS.background,
  style,
  ...props
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: insets.top,
        },
        style,
      ]}
      {...props}
    >
      <StatusBar barStyle="dark-content" />
      <View
        style={[
          styles.content,
          withPadding && styles.padding,
          { paddingBottom: insets.bottom || SPACING.md }
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: SPACING.md,
  },
});
