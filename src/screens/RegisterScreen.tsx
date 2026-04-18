import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react-native';

export const RegisterScreen = ({ navigation }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleRegister = () => {
    // In a real app, perform registration then navigate
    navigation.replace('MainTabs');
  };

  const InputField = ({ label, icon: Icon, secure, keyName, placeholder, ...props }: any) => (
    <View style={styles.inputWrapper}>
      <Typography variant="caption" style={styles.inputLabel}>{label}</Typography>
      <View style={styles.inputContainer}>
        <View style={styles.iconBox}>
          <Icon size={20} color={COLORS.textSecondary} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          secureTextEntry={secure && !showPassword}
          value={(formData as any)[keyName]}
          onChangeText={(text) => handleInputChange(keyName, text)}
          {...props}
        />
        {secure && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            {showPassword ? <EyeOff size={20} color={COLORS.textSecondary} /> : <Eye size={20} color={COLORS.textSecondary} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Typography variant="h1">Create Account</Typography>
          <Typography variant="bodySecondary">Join InstaGrocery for a premium experience</Typography>
        </View>

        <InputField label="Full Name" icon={User} keyName="fullName" placeholder="John Doe" />
        <InputField label="Email Address" icon={Mail} keyName="email" placeholder="john@example.com" keyboardType="email-address" />
        <InputField label="Phone Number" icon={Phone} keyName="phoneNumber" placeholder="9876543210" keyboardType="phone-pad" />
        <InputField label="Password" icon={Lock} keyName="password" placeholder="••••••••" secure />
        <InputField label="Confirm Password" icon={Lock} keyName="confirmPassword" placeholder="••••••••" secure />

        <Button
          label="Create Account"
          onPress={handleRegister}
          fullWidth
          style={styles.registerButton}
        />

        <TouchableOpacity 
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}
        >
          <Typography variant="body">
            Already have an account? <Typography variant="bodyLarge" color={COLORS.primary}>Login</Typography>
          </Typography>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: SPACING.lg,
  },
  inputLabel: {
    marginBottom: 6,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.md,
    height: 56,
    backgroundColor: COLORS.white,
  },
  iconBox: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.gray200,
  },
  input: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
  },
  eyeIcon: {
    padding: SPACING.md,
  },
  registerButton: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  loginLink: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
});
