import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../theme/theme';
import { ShoppingBag } from 'lucide-react-native';
import { Typography } from '../components/Typography';

export const SplashScreen = ({ navigation }: any) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <ShoppingBag size={80} color={COLORS.white} />
        </View>
        <Typography variant="h1" color={COLORS.white} style={styles.title}>
          InstaGrocery
        </Typography>
        <Typography variant="body" color={COLORS.white} style={styles.tagline}>
          Groceries in 30 minutes
        </Typography>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  tagline: {
    marginTop: 8,
    opacity: 0.9,
  },
});
