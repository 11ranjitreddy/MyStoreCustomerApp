import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { Plus, Home, Briefcase, ArrowLeft } from 'lucide-react-native';

const ADDRESSES = [
  { id: '1', label: 'Home', type: 'home', text: 'B-12, Sector 63, Noida, UP 201301' },
  { id: '2', label: 'Office', type: 'work', text: 'Tower C, DLF Cyber City, Gurgaon, HR 122002' },
];

export const AddressSelectionScreen = ({ navigation }: any) => {
  const [selected, setSelected] = useState('1');

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Typography variant="h2" style={styles.headerTitle}>Select Address</Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.addCard} onPress={() => navigation.navigate('MainTabs')}>
          <Plus size={24} color={COLORS.primary} />
          <Typography variant="bodyLarge" color={COLORS.primary} style={styles.addText}>Add New Address</Typography>
        </TouchableOpacity>

        <Typography variant="h3" style={styles.sectionTitle}>Saved Addresses</Typography>

        {ADDRESSES.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.addressCard, selected === item.id && styles.selectedCard]}
            onPress={() => setSelected(item.id)}
          >
            <View style={styles.addressIcon}>
              {item.type === 'home' ? <Home size={20} color={COLORS.text} /> : <Briefcase size={20} color={COLORS.text} />}
            </View>
            <View style={styles.addressInfo}>
              <Typography variant="bodyLarge">{item.label}</Typography>
              <Typography variant="bodySecondary" numberOfLines={2}>{item.text}</Typography>
            </View>
            <View style={[styles.radio, selected === item.id && styles.radioActive]}>
              {selected === item.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button label="Deliver to this Address" fullWidth onPress={() => navigation.navigate('Checkout')} />
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
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    backgroundColor: '#FFF8F1',
    marginBottom: SPACING.xl,
  },
  addText: {
    marginLeft: SPACING.md,
    fontWeight: '700',
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
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    ...SHADOWS.light,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF8F1',
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressInfo: {
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
  footer: {
    marginTop: 'auto',
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.white,
  },
});
