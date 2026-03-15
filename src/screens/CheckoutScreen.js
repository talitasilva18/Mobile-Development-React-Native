import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { formatCurrency } from '../utils/formatCurrency';

export default function CheckoutScreen({ navigation, cart, setCart, settings }) {
  const isLight = settings?.lightTheme ?? true;
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function finishPurchase() {
    Alert.alert('Compra realizada', 'Seu pedido foi finalizado com sucesso!');
    setCart([]);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Produtos' }],
    });
  }

  return (
    <View style={[styles.container, { backgroundColor: isLight ? '#fff' : '#121212' }]}>
      <Text style={[styles.title, { color: isLight ? '#222' : '#fff' }]}>
        Finalizar Compra
      </Text>

      <Text style={[styles.text, { color: isLight ? '#333' : '#ccc' }]}>
        Itens no carrinho: {cart.length}
      </Text>

      <Text style={[styles.total, { color: isLight ? '#222' : '#fff' }]}>
        Valor total: {formatCurrency(total)}
      </Text>

      <TouchableOpacity style={styles.button} onPress={finishPurchase}>
        <Text style={styles.buttonText}>Confirmar Compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
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