import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ArrowLeft, Share2, Heart, Minus, Plus, ChevronDown } from 'lucide-react-native';
import { PRODUCTS } from '../utils/mockData';
import { useCartStore } from '../store/useCartStore';

const { width } = Dimensions.get('window');

export const ProductDetailScreen = ({ navigation, route }: any) => {
  const { product } = route.params || { product: PRODUCTS[0] };
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartItems = useCartStore((state) => state.items);

  const handleAddToCart = () => {
    // Add logic to add multiple if needed, or just add and then update quantity
    addItem(product);
    if (quantity > 1) {
      updateQuantity(product.id, quantity);
    }
    navigation.navigate('Cart');
  };

  return (
    <ScreenWrapper withPadding={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Share2 size={24} color={COLORS.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Heart size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        
        <View style={styles.content}>
          <Typography variant="caption" color={COLORS.primary} style={styles.brand}>
            {product.brand}
          </Typography>
          <Typography variant="h1" style={styles.name}>{product.name}</Typography>
          <Typography variant="bodyLarge" color={COLORS.textSecondary}>{product.weight}</Typography>

          <View style={styles.priceContainer}>
            <View style={styles.priceInfo}>
              <Typography variant="h1" color={COLORS.primary}>₹{product.price}</Typography>
              {product.originalPrice > product.price && (
                <Typography variant="body" style={styles.originalPrice}>₹{product.originalPrice}</Typography>
              )}
            </View>
            <View style={styles.stepper}>
              <TouchableOpacity 
                style={styles.stepperBtn} 
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <Typography variant="h3" style={styles.quantityText}>{quantity}</Typography>
              <TouchableOpacity 
                style={styles.stepperBtn}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Plus size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Typography variant="h3" style={styles.sectionTitle}>Product Details</Typography>
            <Typography variant="bodySecondary">
              High quality fresh product sourced directly from farms. Packed with essential nutrients and vitamins. Perfect for a healthy lifestyle.
            </Typography>
          </View>

          <TouchableOpacity style={styles.accordion}>
            <Typography variant="bodyLarge">Nutritional Info</Typography>
            <ChevronDown size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <View style={styles.section}>
            <Typography variant="h3" style={styles.sectionTitle}>Customers also bought</Typography>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {PRODUCTS.filter(p => p.id !== product.id).map((p) => (
                <TouchableOpacity key={p.id} style={styles.relatedItem}>
                  <Image source={{ uri: p.image }} style={styles.relatedImage} />
                  <Typography variant="body" numberOfLines={1}>{p.name}</Typography>
                  <Typography variant="caption" color={COLORS.primary} style={{ fontWeight: '700' }}>₹{p.price}</Typography>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          label={`Add ${quantity} to Cart`} 
          fullWidth 
          onPress={handleAddToCart}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SPACING.sm,
  },
  productImage: {
    width: width,
    height: width,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    marginTop: -RADIUS.xl,
  },
  brand: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  name: {
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
    marginLeft: SPACING.md,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
  },
  stepperBtn: {
    padding: 10,
  },
  quantityText: {
    paddingHorizontal: 15,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray200,
    marginVertical: SPACING.xl,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  accordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  relatedItem: {
    width: 130,
    marginRight: SPACING.md,
  },
  relatedImage: {
    width: 130,
    height: 130,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surface,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
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
