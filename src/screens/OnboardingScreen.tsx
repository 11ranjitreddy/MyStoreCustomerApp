import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ViewToken,
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ShoppingBasket, Bike, BadgePercent } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Fresh groceries at your door',
    description: 'Get the freshest fruits and vegetables delivered directly to your home.',
    icon: <ShoppingBasket size={120} color={COLORS.primary} />,
  },
  {
    id: '2',
    title: 'Delivered in 30 minutes',
    description: 'Ultra-fast delivery that fits your busy lifestyle.',
    icon: <Bike size={120} color={COLORS.primary} />,
  },
  {
    id: '3',
    title: '100+ products at best prices',
    description: 'Wide variety of products at the most competitive market rates.',
    icon: <BadgePercent size={120} color={COLORS.primary} />,
  },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  return (
    <ScreenWrapper withPadding={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip}>
          <Typography variant="bodyLarge" color={COLORS.primary}>Skip</Typography>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.iconContainer}>{item.icon}</View>
            <Typography variant="h1" align="center" style={styles.title}>
              {item.title}
            </Typography>
            <Typography variant="bodyLarge" align="center" color={COLORS.textSecondary} style={styles.description}>
              {item.description}
            </Typography>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        <Button
          label={currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          fullWidth
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: SPACING.md,
    alignItems: 'flex-end',
  },
  slide: {
    width,
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: SPACING.xxl,
    height: 200,
    justifyContent: 'center',
  },
  title: {
    marginBottom: SPACING.md,
  },
  description: {
    paddingHorizontal: SPACING.lg,
  },
  footer: {
    padding: SPACING.xl,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: COLORS.gray300,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.primary,
    width: 20,
  },
});
