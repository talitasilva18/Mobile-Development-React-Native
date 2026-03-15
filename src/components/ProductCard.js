import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

export default function ProductsScreen({ navigation, route, cart, settings }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = route.params?.category || 'mens-shirts';
  const isLight = settings?.lightTheme ?? true;

  useEffect(() => {
    setLoading(true);

    api
      .get(`/products/category/${category}`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log('Erro ao buscar produtos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  function handleOpenDetails(id) {
    navigation.navigate('Detalhes', { id });
  }

  return (
    <View style={[styles.container, { backgroundColor: isLight ? '#f4f6f8' : '#121212' }]}>
      <View style={[styles.header, { backgroundColor: isLight ? '#fff' : '#1f1f1f' }]}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Configurações')}
        >
          <Ionicons name="settings-outline" size={26} color={isLight ? '#222' : '#fff'} />
        </TouchableOpacity>

        <Text style={[styles.headerTitle, { color: isLight ? '#222' : '#fff' }]}>
          Produtos
        </Text>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Carrinho')}
        >
          <Ionicons name="cart-outline" size={26} color={isLight ? '#222' : '#fff'} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={[styles.loadingText, { color: isLight ? '#555' : '#ccc' }]}>
            Carregando produtos...
          </Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={handleOpenDetails} isLight={isLight} />
          )}
          ListEmptyComponent={
            <Text style={[styles.emptyText, { color: isLight ? '#555' : '#ccc' }]}>
              Nenhum produto encontrado.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  header: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  iconButton: {
    width: 40,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cartButton: {
    width: 40,
    alignItems: 'flex-end',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: '#ff4d4f',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
});