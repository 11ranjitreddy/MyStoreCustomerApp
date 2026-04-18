import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { 
  MapPin, 
  ShoppingBag, 
  Ticket, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  Star, 
  FileText, 
  LogOut, 
  ChevronRight,
  User
} from 'lucide-react-native';

const MENU_ITEMS = [
  { id: 'addresses', label: 'My Addresses', icon: MapPin },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'coupons', label: 'My Coupons', icon: Ticket },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
  { id: 'rate', label: 'Rate the App', icon: Star },
  { id: 'terms', label: 'Terms & Privacy Policy', icon: FileText },
];

export const ProfileScreen = ({ navigation }: any) => {
  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <User size={40} color={COLORS.primary} />
          </View>
          <View style={styles.userInfo}>
            <Typography variant="h2">Ranjit Kumar</Typography>
            <Typography variant="bodySecondary">+91 9876543210</Typography>
            <TouchableOpacity style={styles.editBtn}>
              <Typography variant="caption" color={COLORS.primary}>Edit Profile</Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuIconBox}>
                <item.icon size={20} color={COLORS.text} />
              </View>
              <Typography variant="bodyLarge" style={styles.menuLabel}>{item.label}</Typography>
              <ChevronRight size={20} color={COLORS.gray300} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity 
          style={styles.logoutBtn}
          onPress={() => navigation.replace('Login')}
        >
          <LogOut size={20} color={COLORS.error} />
          <Typography variant="bodyLarge" color={COLORS.error} style={styles.logoutText}>Logout</Typography>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Typography variant="caption">App Version 1.0.0</Typography>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    ...SHADOWS.medium,
    marginBottom: SPACING.xl,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  userInfo: {
    marginLeft: SPACING.xl,
    flex: 1,
  },
  editBtn: {
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm,
    ...SHADOWS.light,
    marginBottom: SPACING.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  menuLabel: {
    flex: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    ...SHADOWS.light,
    marginBottom: SPACING.xl,
  },
  logoutText: {
    marginLeft: SPACING.md,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 40,
  },
});
