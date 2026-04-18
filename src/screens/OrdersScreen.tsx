import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ChevronRight, RefreshCcw } from 'lucide-react-native';

const PAST_ORDERS = [
  {
    id: 'IG-982341',
    date: '18 Apr 2026, 10:30 AM',
    items: 'Alphonso Mango, Taaza Milk...',
    total: 553,
    status: 'Delivered',
  },
  {
    id: 'IG-981220',
    date: '15 Apr 2026, 04:15 PM',
    items: 'Marie Gold, Zero Sugar...',
    total: 75,
    status: 'Delivered',
  },
];

export const OrdersScreen = ({ navigation }: any) => {
  return (
    <ScreenWrapper>
      <Typography variant="h2" style={styles.title}>My Orders</Typography>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Active Orders</Typography>
          <TouchableOpacity 
            style={styles.activeCard}
            onPress={() => navigation.navigate('OrderTracking')}
          >
            <View style={styles.activeHeader}>
              <View style={styles.statusIndicator} />
              <Typography variant="bodyLarge" color={COLORS.primary}>Out for Delivery</Typography>
            </View>
            <Typography variant="bodySecondary">Order ID: #IG-982341</Typography>
            <Typography variant="body" style={styles.activeItems}>2 items • ₹553</Typography>
            <View style={styles.trackLink}>
              <Typography color={COLORS.primary} style={{ fontWeight: '700' }}>Track Order</Typography>
              <ChevronRight size={16} color={COLORS.primary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Past Orders</Typography>
          {PAST_ORDERS.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Typography variant="bodyLarge">{order.date}</Typography>
                <View style={styles.statusBadge}>
                  <Typography variant="caption" color={COLORS.success}>{order.status}</Typography>
                </View>
              </View>
              <Typography variant="bodySecondary" numberOfLines={1}>{order.items}</Typography>
              <View style={styles.orderFooter}>
                <Typography variant="h3">₹{order.total}</Typography>
                <TouchableOpacity style={styles.reorderBtn}>
                  <RefreshCcw size={14} color={COLORS.primary} />
                  <Typography variant="caption" color={COLORS.primary} style={styles.reorderText}>REORDER</Typography>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  activeCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  activeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },
  activeItems: {
    marginTop: 8,
    marginBottom: 12,
  },
  trackLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderCard: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
  },
  reorderText: {
    marginLeft: 6,
    fontWeight: '700',
  },
});
