import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { MapPin, Clock, CreditCard, Wallet, Banknote, ArrowLeft } from 'lucide-react-native';
import { useCartStore } from '../store/useCartStore';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI (GPay, PhonePe, Paytm)', icon: <Wallet size={24} color={COLORS.text} /> },
  { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={24} color={COLORS.text} /> },
  { id: 'cod', label: 'Cash on Delivery', icon: <Banknote size={24} color={COLORS.text} /> },
];

export const CheckoutScreen = ({ navigation }: any) => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 299 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    clearCart();
    navigation.replace('OrderConfirmed');
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Typography variant="h2" style={styles.headerTitle}>Checkout</Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Address Card */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Typography variant="h3">Delivery Address</Typography>
            <TouchableOpacity onPress={() => navigation.navigate('AddressSelection')}>
              <Typography color={COLORS.primary} style={{ fontWeight: '600' }}>Change</Typography>
            </TouchableOpacity>
          </View>
          <View style={styles.addressCard}>
            <MapPin size={24} color={COLORS.primary} />
            <View style={styles.addressInfo}>
              <Typography variant="bodyLarge">Home</Typography>
              <Typography variant="bodySecondary">B-12, Sector 63, Noida, UP 201301</Typography>
            </View>
          </View>
        </View>

        {/* Delivery Time */}
        <View style={styles.deliveryTime}>
          <Clock size={20} color={COLORS.success} />
          <Typography variant="bodyLarge" color={COLORS.success} style={styles.deliveryText}>
            Estimated Delivery: 25-30 mins
          </Typography>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Payment Method</Typography>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity 
              key={method.id} 
              style={[styles.paymentCard, paymentMethod === method.id && styles.selectedPayment]}
              onPress={() => setPaymentMethod(method.id)}
            >
              {method.icon}
              <Typography variant="body" style={styles.paymentLabel}>{method.label}</Typography>
              <View style={[styles.radio, paymentMethod === method.id && styles.radioActive]}>
                {paymentMethod === method.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bill Details */}
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Bill Summary</Typography>
          <View style={styles.billDetails}>
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
              <Typography variant="h2">To Pay</Typography>
              <Typography variant="h2">₹{total}</Typography>
            </View>
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          label={`Place Order • ₹${total}`} 
          fullWidth 
          onPress={handlePlaceOrder}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  headerTitle: {
    marginLeft: SPACING.md,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  addressInfo: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  deliveryTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  deliveryText: {
    marginLeft: SPACING.sm,
    fontWeight: '700',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  selectedPayment: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF8F1',
  },
  paymentLabel: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gray300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  billDetails: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
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
});
