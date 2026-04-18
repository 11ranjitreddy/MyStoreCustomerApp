import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ArrowLeft, Phone, Star, CheckCircle2, Circle } from 'lucide-react-native';

export const OrderTrackingScreen = ({ navigation }: any) => {
  return (
    <ScreenWrapper withPadding={false}>
      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1000&auto=format&fit=crop' }} 
          style={styles.mapImage} 
        />
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Tracking Bottom Sheet */}
      <View style={styles.sheet}>
        <View style={styles.dragHandle} />
        
        <View style={styles.etaContainer}>
          <Typography variant="h2">Arriving in ~12 mins</Typography>
          <Typography variant="bodySecondary">Your order is out for delivery</Typography>
        </View>

        <View style={styles.stepper}>
          <View style={styles.step}>
            <CheckCircle2 size={24} color={COLORS.success} />
            <Typography variant="body" style={styles.stepText}>Order Placed</Typography>
          </View>
          <View style={styles.stepLineActive} />
          <View style={styles.step}>
            <CheckCircle2 size={24} color={COLORS.success} />
            <Typography variant="body" style={styles.stepText}>Order Packed</Typography>
          </View>
          <View style={styles.stepLineActive} />
          <View style={styles.step}>
            <View style={styles.activeStepCircle}>
              <View style={styles.innerActiveCircle} />
            </View>
            <Typography variant="bodyLarge" style={styles.stepTextActive}>Out for Delivery</Typography>
          </View>
          <View style={styles.stepLine} />
          <View style={styles.step}>
            <Circle size={24} color={COLORS.gray300} />
            <Typography variant="body" color={COLORS.textSecondary} style={styles.stepText}>Delivered</Typography>
          </View>
        </View>

        <View style={styles.deliveryBoyCard}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop' }} 
            style={styles.avatar} 
          />
          <View style={styles.boyInfo}>
            <Typography variant="bodyLarge">Rahul Kumar</Typography>
            <View style={styles.ratingRow}>
              <Star size={14} color="#FFB800" fill="#FFB800" />
              <Typography variant="caption" style={{ marginLeft: 4 }}>4.8</Typography>
            </View>
          </View>
          <TouchableOpacity style={styles.callBtn}>
            <Phone size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    minHeight: 400,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  sheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: SPACING.xl,
    paddingTop: SPACING.md,
    ...SHADOWS.medium,
    marginTop: -30,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.gray200,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },
  etaContainer: {
    marginBottom: SPACING.xl,
  },
  stepper: {
    marginBottom: SPACING.xl,
    paddingLeft: 10,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepText: {
    marginLeft: SPACING.md,
  },
  stepTextActive: {
    marginLeft: SPACING.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  stepLine: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.gray200,
    marginLeft: 11,
    marginVertical: 4,
  },
  stepLineActive: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.success,
    marginLeft: 11,
    marginVertical: 4,
  },
  activeStepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerActiveCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  deliveryBoyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  boyInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  callBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
