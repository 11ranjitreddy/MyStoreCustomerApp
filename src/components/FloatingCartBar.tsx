import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { ShoppingBag, ChevronRight } from 'lucide-react-native';
import { useCartStore } from '../store/useCartStore';

export const FloatingCartBar = ({ onPress }: { onPress: () => void }) => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) return null;

  return (
    <TouchableOpacity 
      activeOpacity={0.9} 
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.left}>
        <View style={styles.iconBadge}>
          <ShoppingBag size={20} color={COLORS.white} />
          <View style={styles.badge}>
            <Typography variant="caption" color={COLORS.primary} style={styles.badgeText}>
              {totalItems}
            </Typography>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Typography variant="bodyLarge" color={COLORS.white}>₹{totalPrice}</Typography>
          <Typography variant="caption" color={COLORS.white} style={{ opacity: 0.8 }}>
            plus taxes
          </Typography>
        </View>
      </View>
      <View style={styles.right}>
        <Typography variant="bodyLarge" color={COLORS.white} style={{ fontWeight: '700' }}>
          View Cart
        </Typography>
        <ChevronRight size={20} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.medium,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBadge: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  textContainer: {
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
