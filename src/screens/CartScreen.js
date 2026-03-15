import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { formatCurrency } from '../utils/formatCurrency';

export default function CartScreen({ navigation, cart, setCart, settings }) {
  const isLight = settings?.lightTheme ?? true;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  }

  return (
    <View style={[styles.container, { backgroundColor: isLight ? '#f4f6f8' : '#121212' }]}>
      <FlatList
        data={cart}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: isLight ? '#333' : '#ccc' }]}>
            Seu carrinho está vazio.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: isLight ? '#fff' : '#1f1f1f' }]}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />

            <View style={styles.info}>
              <Text style={[styles.title, { color: isLight ? '#222' : '#fff' }]}>{item.title}</Text>
              <Text style={{ color: isLight ? '#333' : '#ccc' }}>{formatCurrency(item.price)}</Text>
              <Text style={{ color: isLight ? '#333' : '#ccc' }}>Quantidade: {item.quantity}</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.smallButton} onPress={() => decreaseQuantity(item.id)}>
                  <Text style={styles.smallButtonText}>-</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.smallButton} onPress={() => increaseQuantity(item.id)}>
                  <Text style={styles.smallButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={[styles.total, { color: isLight ? '#222' : '#fff' }]}>
          Total: {formatCurrency(total)}
        </Text>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}
          disabled={cart.length === 0}
        >
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
  },
  smallButton: {
    backgroundColor: '#2b7cff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  smallButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});