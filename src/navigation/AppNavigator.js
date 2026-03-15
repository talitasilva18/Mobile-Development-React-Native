import React from 'react';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function MasculinoTab(props) {
  return <ProductsScreen {...props} gender="male" />;
}

function FemininoTab(props) {
  return <ProductsScreen {...props} gender="female" />;
}

function ProductsTabBar({ state, descriptors, navigation, cart, settings }) {
  const isLight = settings?.lightTheme ?? true;
  const storeName = 'Mega Store';

  return (
    <View
      style={[
        styles.tabBarWrapper,
        { backgroundColor: isLight ? '#f4f6f8' : '#121212' },
      ]}
    >
      <View
        style={[
          styles.topBar,
          { backgroundColor: isLight ? '#fff' : '#1f1f1f' },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Configurações')}>
          <Ionicons
            name="settings-outline"
            size={24}
            color={isLight ? '#222' : '#fff'}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            { color: isLight ? '#222' : '#fff' },
          ]}
        >
          {storeName}
        </Text>

        <TouchableOpacity
          style={styles.cartArea}
          onPress={() => navigation.navigate('Carrinho')}
        >
          <Ionicons
            name="cart-outline"
            size={24}
            color={isLight ? '#222' : '#fff'}
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.tabsContainer,
          { backgroundColor: isLight ? '#fff' : '#1f1f1f' },
        ]}
      >
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const label =
            descriptors[route.key].options.title ?? route.name;

          return (
            <TouchableOpacity
              key={route.key}
              style={[
                styles.tabButton,
                isFocused && styles.activeTab,
                {
                  backgroundColor: isFocused
                    ? '#2b7cff'
                    : isLight
                    ? '#d9e2f2'
                    : '#2a2a2a',
                },
              ]}
              onPress={() => navigation.navigate(route.name)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: isFocused
                      ? '#fff'
                      : isLight
                      ? '#222'
                      : '#fff',
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function ProductsTabs({ cart, settings }) {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <ProductsTabBar
          {...props}
          cart={cart}
          settings={settings}
        />
      )}
      screenOptions={{
        swipeEnabled: true,
      }}
    >
      <Tab.Screen name="Masculino">
        {(props) => (
          <MasculinoTab
            {...props}
            cart={cart}
            settings={settings}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Feminino">
        {(props) => (
          <FemininoTab
            {...props}
            cart={cart}
            settings={settings}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function AppNavigator({
  cart,
  setCart,
  settings,
  setSettings,
}) {
  const isLight = settings?.lightTheme ?? true;

  const defaultHeaderOptions = {
    headerStyle: {
      backgroundColor: isLight ? '#ffffff' : '#1f1f1f',
    },
    headerTintColor: isLight ? '#222222' : '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: isLight ? '#222222' : '#ffffff',
    },
    headerShadowVisible: false,
  };

  return (
    <Stack.Navigator screenOptions={defaultHeaderOptions}>
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
      >
        {(props) => <LoginScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="Cadastro"
        options={{ title: 'Criar Conta' }}
      >
        {(props) => <RegisterScreen {...props} />}
      </Stack.Screen>

      <Stack.Screen
        name="Produtos"
        options={{ headerShown: false }}
      >
        {(props) => (
          <ProductsTabs
            {...props}
            cart={cart}
            settings={settings}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Detalhes"
        options={{ title: 'Detalhes do Produto' }}
      >
        {(props) => (
          <ProductDetailScreen
            {...props}
            cart={cart}
            setCart={setCart}
            settings={settings}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Carrinho"
        options={{ title: 'Carrinho' }}
      >
        {(props) => (
          <CartScreen
            {...props}
            cart={cart}
            setCart={setCart}
            settings={settings}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Checkout"
        options={{ title: 'Finalizar Compra' }}
      >
        {(props) => (
          <CheckoutScreen
            {...props}
            cart={cart}
            setCart={setCart}
            settings={settings}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="Configurações"
        options={{ title: 'Configurações' }}
      >
        {(props) => (
          <SettingsScreen
            {...props}
            settings={settings}
            setSettings={setSettings}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  topBar: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  cartArea: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -10,
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
  tabsContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 8,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  activeTab: {},
  tabText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});