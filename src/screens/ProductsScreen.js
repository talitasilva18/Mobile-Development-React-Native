import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import api from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';

const MALE_CATEGORIES = [
  { label: 'Camisas', value: 'mens-shirts' },
  { label: 'Sapatos', value: 'mens-shoes' },
  { label: 'Relógios', value: 'mens-watches' },
];

const FEMALE_CATEGORIES = [
  { label: 'Bolsas', value: 'womens-bags' },
  { label: 'Vestidos', value: 'womens-dresses' },
  { label: 'Joias', value: 'womens-jewellery' },
  { label: 'Sapatos', value: 'womens-shoes' },
  { label: 'Relógios', value: 'womens-watches' },
];

export default function ProductsScreen({
  navigation,
  settings,
  gender = 'male',
}) {
  const categories = useMemo(() => {
    return gender === 'female' ? FEMALE_CATEGORIES : MALE_CATEGORIES;
  }, [gender]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isLight = settings?.lightTheme ?? true;

  useEffect(() => {
    setSelectedCategory(categories[0].value);
  }, [categories]);

  useEffect(() => {
    setLoading(true);

    api
      .get(`/products/category/${selectedCategory}`)
      .then((response) => {
        setProducts(response.data.products || []);
      })
      .catch((error) => {
        console.log('Erro ao buscar produtos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isLight ? '#f4f6f8' : '#121212' },
      ]}
    >
      <View
        style={[
          styles.categoriesWrapper,
          { backgroundColor: isLight ? '#ffffff' : '#1f1f1f' },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((item) => {
            const active = selectedCategory === item.value;

            return (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor: active
                      ? '#2b7cff'
                      : isLight
                      ? '#d9e2f2'
                      : '#2a2a2a',
                  },
                ]}
                onPress={() => setSelectedCategory(item.value)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color: active
                        ? '#fff'
                        : isLight
                        ? '#222'
                        : '#fff',
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text
            style={[
              styles.text,
              { color: isLight ? '#333' : '#ccc' },
            ]}
          >
            Carregando produtos...
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                { backgroundColor: isLight ? '#fff' : '#1f1f1f' },
              ]}
            >
              <View
                style={[
                  styles.imageWrapper,
                  { backgroundColor: isLight ? '#f7f7f7' : '#2b2b2b' },
                ]}
              >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={styles.image}
                />
              </View>

              <Text
                style={[
                  styles.title,
                  { color: isLight ? '#222' : '#fff' },
                ]}
              >
                {item.title}
              </Text>

              <Text style={styles.price}>
                {formatCurrency(item.price)}
              </Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('Detalhes', { id: item.id })
                }
              >
                <Text style={styles.buttonText}>Ver detalhes</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text
              style={[
                styles.text,
                { color: isLight ? '#333' : '#ccc' },
              ]}
            >
              Nenhum produto encontrado.
            </Text>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoriesWrapper: {
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 12,
    paddingVertical: 10,
    minHeight: 64,
    justifyContent: 'center',
  },
  categoryContainer: {
    paddingHorizontal: 12,
    alignItems: 'center',
    gap: 10,
  },
  categoryButton: {
    minHeight: 40,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  imageWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '92%',
    height: '92%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 15,
    color: '#2b7cff',
    marginTop: 4,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2b7cff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});