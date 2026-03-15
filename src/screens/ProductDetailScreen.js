import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import api from '../services/api';
import { formatCurrency } from '../utils/formatCurrency';

export default function ProductDetailScreen({ route, navigation, cart, setCart, settings }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const isLight = settings?.lightTheme ?? true;

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log('Erro ao buscar detalhes:', error);
      });
  }, [id]);

  function addToCart() {
    const itemExists = cart.find((item) => item.id === product.id);

    if (itemExists) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        },
      ]);
    }

    navigation.navigate('Carrinho');
  }

  if (!product) {
    return (
      <View style={[styles.center, { backgroundColor: isLight ? '#fff' : '#121212' }]}>
        <ActivityIndicator size="large" />
        <Text style={{ color: isLight ? '#333' : '#ccc', marginTop: 10 }}>
          Carregando detalhes...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isLight ? '#fff' : '#121212' }]}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />

      <Text style={[styles.title, { color: isLight ? '#222' : '#fff' }]}>{product.title}</Text>
      <Text style={[styles.description, { color: isLight ? '#555' : '#ccc' }]}>
        {product.description}
      </Text>

      <View style={[styles.infoBox, { backgroundColor: isLight ? '#f4f6f8' : '#1f1f1f' }]}>
        <Text style={[styles.infoText, { color: isLight ? '#333' : '#fff' }]}>
          Preço: {formatCurrency(product.price)}
        </Text>
        <Text style={[styles.infoText, { color: isLight ? '#333' : '#fff' }]}>
          Desconto: {product.discountPercentage}%
        </Text>
        <Text style={[styles.infoText, { color: isLight ? '#333' : '#fff' }]}>
          Categoria: {product.category}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 18,
  },
  infoBox: {
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2b7cff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});