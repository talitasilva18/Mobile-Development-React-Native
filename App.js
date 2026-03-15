import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [cart, setCart] = useState([]);
  const [settings, setSettings] = useState({
    notifications: true,
    lightTheme: true,
  });

  return (
    <NavigationContainer>
      <AppNavigator
        cart={cart}
        setCart={setCart}
        settings={settings}
        setSettings={setSettings}
      />
    </NavigationContainer>
  );
}