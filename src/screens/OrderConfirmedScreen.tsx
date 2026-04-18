import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { CheckCircle } from 'lucide-react-native';

export const OrderConfirmedScreen = ({ navigation }: any) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
          <CheckCircle size={100} color={COLORS.success} />
        </Animated.View>
        
        <Typography variant="h1" style={styles.title}>Order Placed Successfully! 🎉</Typography>
        <Typography variant="bodySecondary" align="center" style={styles.subtitle}>
          Your groceries are being packed and will arrive in 30 mins.
        </Typography>

        <View style={styles.orderInfo}>
          <Typography variant="bodySecondary">Order ID: #IG-982341</Typography>
          <Typography variant="bodyLarge" style={styles.etaText}>Estimated arrival: 11:45 AM</Typography>
        </View>

        <Button 
          label="Track Order" 
          fullWidth 
          onPress={() => navigation.navigate('OrderTracking')} 
          style={styles.trackBtn}
        />
        <Button 
          label="Continue Shopping" 
          variant="outline"
          fullWidth 
          onPress={() => navigation.replace('MainTabs')} 
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  iconContainer: {
    marginBottom: SPACING.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    marginBottom: SPACING.xxl,
  },
  orderInfo: {
    backgroundColor: COLORS.surface,
    padding: SPACING.xl,
    borderRadius: RADIUS.lg,
    width: '100%',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  etaText: {
    marginTop: 8,
    fontWeight: '700',
  },
  trackBtn: {
    marginBottom: SPACING.md,
  },
});
