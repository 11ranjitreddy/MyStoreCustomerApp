import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme/theme';
import { Typography } from '../components/Typography';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { ArrowLeft, Search, X } from 'lucide-react-native';
import { PRODUCTS } from '../utils/mockData';

const RECENT_SEARCHES = ['Mango', 'Milk', 'Bread', 'Chips'];
const POPULAR_SEARCHES = ['Coca Cola', 'Amul Butter', 'Onion', 'Tomato', 'Egg'];

export const SearchScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  const renderProductItem = ({ item }: any) => (
    <View style={styles.resultItem}>
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Typography variant="body" numberOfLines={2} style={{ height: 40 }}>{item.name}</Typography>
        <Typography variant="caption">{item.weight}</Typography>
        <Typography variant="bodyLarge" color={COLORS.primary}>₹{item.price}</Typography>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Typography variant="caption" color={COLORS.primary} style={{ fontWeight: '700' }}>ADD</Typography>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper withPadding={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Search size={20} color={COLORS.textSecondary} />
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Search for groceries..."
            value={query}
            onChangeText={handleSearch}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {query.length === 0 ? (
        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <Typography variant="h3" style={styles.sectionTitle}>Recent Searches</Typography>
            <View style={styles.chipContainer}>
              {RECENT_SEARCHES.map((item) => (
                <TouchableOpacity key={item} style={styles.chip} onPress={() => handleSearch(item)}>
                  <Typography variant="body">{item}</Typography>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Typography variant="h3" style={styles.sectionTitle}>Popular Searches</Typography>
            <View style={styles.chipContainer}>
              {POPULAR_SEARCHES.map((item) => (
                <TouchableOpacity key={item} style={styles.chip} onPress={() => handleSearch(item)}>
                  <Typography variant="body">{item}</Typography>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.resultsContainer}>
          <View style={styles.filterBar}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {['All', 'Price Low-High', 'Price High-Low', 'In Stock'].map((filter) => (
                <TouchableOpacity key={filter} style={styles.filterChip}>
                  <Typography variant="caption">{filter}</Typography>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={renderProductItem}
            contentContainerStyle={styles.resultList}
            ListEmptyComponent={() => (
               <View style={styles.emptyState}>
                 <Typography variant="bodyLarge" color={COLORS.textSecondary}>No results found for "{query}"</Typography>
               </View>
            )}
          />
        </View>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  backBtn: {
    marginRight: SPACING.md,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    height: 44,
  },
  input: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
  },
  content: {
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    marginRight: SPACING.sm,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  resultsContainer: {
    flex: 1,
  },
  filterBar: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  resultList: {
    padding: SPACING.sm,
    paddingBottom: 40,
  },
  resultItem: {
    flex: 1,
    backgroundColor: COLORS.white,
    margin: SPACING.sm,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    padding: SPACING.sm,
    maxWidth: '47%',
  },
  resultImage: {
    width: '100%',
    height: 120,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
  },
  resultInfo: {
    flex: 1,
  },
  addButton: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: RADIUS.md,
  },
  emptyState: {
    marginTop: 100,
    alignItems: 'center',
  },
});
