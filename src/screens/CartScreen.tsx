import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Zap, Trash2, Minus, Plus, ChevronRight, Ticket } from 'lucide-react-native';
import { useCartStore } from '../store/useCartStore';

export const CartScreen = ({ navigation }: any) => {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 299 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <ScreenWrapper style={styles.emptyContainer}>
        <View style={styles.emptyContent}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/11329/11329060.png' }} 
            style={styles.emptyImage} 
          />
          <Typography variant="h2" style={styles.emptyTitle}>Your cart is empty</Typography>
          <Typography variant="bodySecondary" align="center">
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button 
            label="Shop Now" 
            onPress={() => navigation.navigate('HomeTab')} 
            style={styles.shopNowBtn}
          />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper withPadding={false}>
      <View style={styles.header}>
        <Typography variant="h2">My Cart ({items.length} items)</Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.deliveryPromise}>
          <Zap size={16} color={COLORS.success} fill={COLORS.success} />
          <Typography variant="body" color={COLORS.success} style={styles.promiseText}>
            Arrives in 30 mins 🚀
          </Typography>
        </View>

        <View style={styles.itemList}>
          {items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Typography variant="bodyLarge">{item.name}</Typography>
                <Typography variant="caption">{item.weight}</Typography>
                <Typography variant="h3" style={styles.itemPrice}>₹{item.price}</Typography>
              </View>
              <View style={styles.stepperContainer}>
                <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.trashBtn}>
                  <Trash2 size={18} color={COLORS.error} />
                </TouchableOpacity>
                <View style={styles.stepper}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                  <Typography variant="h3" style={styles.quantityText}>{item.quantity}</Typography>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus size={16} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.promoSection}>
          <View style={styles.promoLeft}>
            <Ticket size={24} color={COLORS.primary} />
            <Typography variant="bodyLarge" style={styles.promoText}>Apply Promo Code</Typography>
          </View>
          <ChevronRight size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>

        <View style={styles.billDetails}>
          <Typography variant="h3" style={styles.billTitle}>Bill Details</Typography>
          <View style={styles.billRow}>
            <Typography variant="bodySecondary">Item Total</Typography>
            <Typography variant="body">₹{subtotal}</Typography>
          </View>
          <View style={styles.billRow}>
            <Typography variant="bodySecondary">Delivery Fee</Typography>
            <Typography variant="body" color={deliveryFee === 0 ? COLORS.success : COLORS.text}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </Typography>
          </View>
          <View style={styles.divider} />
          <View style={styles.billRow}>
            <Typography variant="h2">Grand Total</Typography>
            <Typography variant="h2">₹{total}</Typography>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          label={`Proceed to Checkout • ₹${total}`} 
          fullWidth 
          onPress={() => navigation.navigate('AddressSelection')}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  scrollContent: {
    padding: SPACING.md,
  },
  deliveryPromise: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  promiseText: {
    marginLeft: SPACING.sm,
    fontWeight: '700',
  },
  itemList: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.light,
    marginBottom: SPACING.md,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  itemInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  itemPrice: {
    marginTop: 4,
  },
  stepperContainer: {
    alignItems: 'flex-end',
  },
  trashBtn: {
    marginBottom: 8,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  quantityText: {
    paddingHorizontal: 10,
    minWidth: 25,
    textAlign: 'center',
  },
  promoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.light,
    marginBottom: SPACING.md,
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoText: {
    marginLeft: SPACING.md,
  },
  billDetails: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.light,
  },
  billTitle: {
    marginBottom: SPACING.lg,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: SPACING.md,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  emptyContent: {
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: SPACING.xl,
  },
  emptyTitle: {
    marginBottom: SPACING.sm,
  },
  shopNowBtn: {
    marginTop: SPACING.xl,
    paddingHorizontal: SPACING.xxl,
  },
});
