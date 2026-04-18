import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react-native';
import { PRODUCTS } from '../utils/mockData';
import { useCartStore } from '../store/useCartStore';
import { FloatingCartBar } from '../components/FloatingCartBar';

const SUB_CATEGORIES = ['All', 'Organic', 'Seasonal', 'Imported', 'Exotic'];

export const CategoryScreen = ({ navigation, route }: any) => {
  const { categoryName } = route.params || { categoryName: 'Fruits & Veggies' };
  const addItem = useCartStore((state) => state.addItem);

  const renderProductItem = ({ item }: any) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Typography variant="body" numberOfLines={2} style={{ height: 40 }}>{item.name}</Typography>
        <Typography variant="caption">{item.weight}</Typography>
        <View style={styles.priceRow}>
          <Typography variant="bodyLarge" color={COLORS.primary}>₹{item.price}</Typography>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => addItem(item)}
          >
            <Typography variant="caption" color={COLORS.primary} style={{ fontWeight: '700' }}>ADD</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <ScreenWrapper withPadding={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Typography variant="h2" style={styles.headerTitle}>{categoryName}</Typography>
          <TouchableOpacity style={styles.filterBtn}>
            <SlidersHorizontal size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subCategoryContainer}>
            {SUB_CATEGORIES.map((sub, index) => (
              <TouchableOpacity 
                key={sub} 
                style={[styles.subChip, index === 0 && styles.activeSubChip]}
              >
                <Typography 
                  variant="body" 
                  color={index === 0 ? COLORS.white : COLORS.text}
                >
                  {sub}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <FlatList
        data={PRODUCTS}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={styles.productList}
      />
      <FloatingCartBar onPress={() => navigation.navigate('Cart')} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.white,
    paddingTop: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  headerTitle: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  filterBtn: {
    padding: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
  },
  subCategoryContainer: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  subChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  activeSubChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  productList: {
    padding: SPACING.sm,
    paddingBottom: 40,
  },
  productCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    margin: SPACING.sm,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: COLORS.surface,
  },
  productInfo: {
    padding: SPACING.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  addButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
  },
});
