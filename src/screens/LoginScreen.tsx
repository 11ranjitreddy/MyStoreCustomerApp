import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ShoppingBag } from 'lucide-react-native';

export const LoginScreen = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOTP = () => {
    navigation.navigate('OTPVerification', { phoneNumber });
  };

  return (
    <ScreenWrapper style={styles.container}>
      <View style={styles.headerDecoration} />
      
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <ShoppingBag size={40} color={COLORS.white} />
        </View>
        <Typography variant="h1" style={styles.appName}>InstaGrocery</Typography>
      </View>

      <View style={styles.card}>
        <Typography variant="h2" style={styles.cardTitle}>Login or Signup</Typography>
        <Typography variant="bodySecondary" style={styles.cardSubtitle}>
          Enter your phone number to continue
        </Typography>

        <View style={styles.inputContainer}>
          <View style={styles.countryCode}>
            <Typography variant="bodyLarge">+91</Typography>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <Button
          label="Send OTP"
          onPress={handleSendOTP}
          fullWidth
          disabled={phoneNumber.length !== 10}
          style={styles.button}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.dividerText}>
            OR
          </Typography>
          <View style={styles.divider} />
        </View>

        <Button
          label="Continue with Google"
          variant="outline"
          fullWidth
          style={styles.googleButton}
        />

        <TouchableOpacity 
          style={styles.registerLink}
          onPress={() => navigation.navigate('Register')}
        >
          <Typography variant="body">
            New user? <Typography variant="bodyLarge" color={COLORS.primary}>Register</Typography>
          </Typography>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  headerDecoration: {
    position: 'absolute',
    top: -100,
    left: -50,
    right: -50,
    height: 300,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
    opacity: 0.1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  appName: {
    marginTop: 12,
    fontSize: 28,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.medium,
  },
  cardTitle: {
    marginBottom: 4,
  },
  cardSubtitle: {
    marginBottom: SPACING.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.lg,
    height: 56,
  },
  countryCode: {
    paddingHorizontal: SPACING.md,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray300,
  },
  input: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
  },
  button: {
    marginBottom: SPACING.lg,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray200,
  },
  dividerText: {
    paddingHorizontal: SPACING.md,
  },
  googleButton: {
    marginBottom: SPACING.xl,
  },
  registerLink: {
    alignItems: 'center',
  },
});
