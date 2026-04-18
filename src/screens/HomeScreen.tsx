import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { MapPin, ChevronDown, Bell, Search, Zap } from 'lucide-react-native';
import { CATEGORIES, PRODUCTS, BANNERS } from '../utils/mockData';
import { useCartStore } from '../store/useCartStore';
import { FloatingCartBar } from '../components/FloatingCartBar';

const { width } = Dimensions.get('window');

const ProductCard = ({ item, onAdd }: any) => (
  <View style={styles.productCard}>
    <Image source={{ uri: item.image }} style={styles.productImage} />
    {item.discount !== '' && (
      <View style={styles.discountBadge}>
        <Typography variant="caption" color={COLORS.white}>{item.discount}</Typography>
      </View>
    )}
    <View style={styles.productInfo}>
      <Typography variant="body" numberOfLines={1}>{item.name}</Typography>
      <Typography variant="caption">{item.weight}</Typography>
      <View style={styles.priceContainer}>
        <View>
          <Typography variant="bodyLarge" color={COLORS.primary}>₹{item.price}</Typography>
          {item.originalPrice > item.price && (
            <Typography variant="caption" style={styles.originalPrice}>₹{item.originalPrice}</Typography>
          )}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => onAdd(item)}>
          <Typography variant="bodyLarge" color={COLORS.primary} style={{ fontWeight: '700' }}>ADD</Typography>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export const HomeScreen = ({ navigation }: any) => {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <ScreenWrapper withPadding={false} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <MapPin size={20} color={COLORS.primary} />
            <View style={styles.locationText}>
              <View style={styles.locationRow}>
                <Typography variant="h3">Home</Typography>
                <ChevronDown size={16} color={COLORS.text} />
              </View>
              <Typography variant="caption" numberOfLines={1}>
                B-12, Sector 63, Noida, Uttar Pradesh 201301
              </Typography>
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <Bell size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.searchBar}
            onPress={() => navigation.navigate('SearchTab')}
          >
            <Search size={20} color={COLORS.textSecondary} />
            <Typography color={COLORS.textSecondary} style={styles.searchText}>
              Search for groceries...
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Banner Carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.bannerContainer}
        >
          {BANNERS.map((banner) => (
            <Image
              key={banner.id}
              source={{ uri: banner.image }}
              style={styles.bannerImage}
            />
          ))}
        </ScrollView>

        {/* Delivery Promise Bar */}
        <View style={styles.promiseBar}>
          <Zap size={16} color={COLORS.white} fill={COLORS.white} />
          <Typography variant="bodyLarge" color={COLORS.white} style={styles.promiseText}>
            Delivery in 30 mins
          </Typography>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionHeader}>
          <Typography variant="h2">Shop by Category</Typography>
        </View>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Typography variant="h1">{item.icon === 'apple' ? '🍎' : item.icon === 'milk' ? '🥛' : item.icon === 'cookie' ? '🍪' : '☕'}</Typography>
              </View>
              <Typography variant="caption" align="center" style={styles.categoryName}>
                {item.name}
              </Typography>
            </TouchableOpacity>
          )}
        />

        {/* Today's Best Deals */}
        <View style={styles.sectionHeader}>
          <Typography variant="h2">Today's Best Deals</Typography>
          <TouchableOpacity>
            <Typography color={COLORS.primary} style={{ fontWeight: '600' }}>See All</Typography>
          </TouchableOpacity>
        </View>
        <FlatList
          data={PRODUCTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
          renderItem={({ item }) => <ProductCard item={item} onAdd={addItem} />}
        />

        {/* Free Delivery Banner */}
        <View style={styles.freeDeliveryBanner}>
          <Typography variant="bodyLarge" color={COLORS.success} style={{ fontWeight: '700' }}>
            🎉 Free delivery on orders above ₹299
          </Typography>
        </View>

        {/* Recently Ordered */}
        <View style={styles.sectionHeader}>
          <Typography variant="h2">Recently Ordered</Typography>
        </View>
        <View style={styles.recentList}>
          {PRODUCTS.slice(0, 2).map((product) => (
            <View key={product.id} style={styles.recentItem}>
              <Image source={{ uri: product.image }} style={styles.recentImage} />
              <View style={styles.recentInfo}>
                <Typography variant="body" numberOfLines={1}>{product.name}</Typography>
                <Typography variant="caption">₹{product.price}</Typography>
              </View>
              <TouchableOpacity style={styles.reorderBtn} onPress={() => addItem(product)}>
                <Typography variant="caption" color={COLORS.primary} style={{ fontWeight: '700' }}>REORDER</Typography>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
      <FloatingCartBar onPress={() => navigation.navigate('Cart')} />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  header: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  locationText: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBtn: {
    padding: SPACING.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  searchText: {
    marginLeft: SPACING.sm,
  },
  bannerContainer: {
    height: 180,
    marginVertical: SPACING.md,
  },
  bannerImage: {
    width: width - SPACING.md * 2,
    height: 180,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.md,
  },
  promiseBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.lg,
  },
  promiseText: {
    marginLeft: SPACING.sm,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  categoryList: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: SPACING.lg,
    width: 80,
  },
  categoryIcon: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '600',
  },
  productList: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
  },
  productCard: {
    width: 160,
    marginRight: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  productImage: {
    width: '100%',
    height: 130,
    backgroundColor: COLORS.surface,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  productInfo: {
    padding: SPACING.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  addButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
  },
  freeDeliveryBanner: {
    backgroundColor: '#E8F5E9',
    margin: SPACING.md,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  recentList: {
    paddingHorizontal: SPACING.md,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.sm,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: SPACING.sm,
    ...SHADOWS.light,
  },
  recentImage: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
  },
  recentInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  reorderBtn: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.md,
  },
});
