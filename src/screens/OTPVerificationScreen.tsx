import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Edit2 } from 'lucide-react-native';

export const OTPVerificationScreen = ({ navigation, route }: any) => {
  const { phoneNumber } = route.params || { phoneNumber: '9876543210' };
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    // In a real app, verify OTP then navigate
    navigation.replace('MainTabs');
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Typography variant="h1">Enter OTP</Typography>
        <View style={styles.phoneContainer}>
          <Typography variant="bodySecondary">OTP sent to +91 {phoneNumber}</Typography>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.editButton}>
            <Edit2 size={14} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref as TextInput)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <View style={styles.timerContainer}>
        {timer > 0 ? (
          <Typography variant="bodySecondary">Resend OTP in {timer}s</Typography>
        ) : (
          <TouchableOpacity>
            <Typography variant="bodyLarge" color={COLORS.primary}>Resend OTP</Typography>
          </TouchableOpacity>
        )}
      </View>

      <Button
        label="Verify OTP"
        onPress={handleVerify}
        fullWidth
        disabled={otp.some((d) => !d)}
        style={styles.verifyButton}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  editButton: {
    marginLeft: 8,
    padding: 4,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.md,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.text,
    backgroundColor: COLORS.gray100,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  verifyButton: {
    marginTop: 'auto',
    marginBottom: SPACING.xl,
  },
});
