import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';

export default function SettingsScreen({ navigation, settings, setSettings }) {
  function toggleNotifications() {
    setSettings((prev) => ({
      ...prev,
      notifications: !prev.notifications,
    }));
  }

  function toggleTheme() {
    setSettings((prev) => ({
      ...prev,
      lightTheme: !prev.lightTheme,
    }));
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: settings.lightTheme ? '#f4f6f8' : '#1e1e1e' },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: settings.lightTheme ? '#222' : '#fff' },
        ]}
      >
        Configurações
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: settings.lightTheme ? '#fff' : '#2c2c2c' },
        ]}
      >
        <View style={styles.optionRow}>
          <Text
            style={[
              styles.optionText,
              { color: settings.lightTheme ? '#333' : '#fff' },
            ]}
          >
            Notificações
          </Text>
          <Switch
            value={settings.notifications}
            onValueChange={toggleNotifications}
          />
        </View>

        <View style={[styles.optionRow, { borderBottomWidth: 0 }]}>
          <Text
            style={[
              styles.optionText,
              { color: settings.lightTheme ? '#333' : '#fff' },
            ]}
          >
            Tema claro
          </Text>
          <Switch
            value={settings.lightTheme}
            onValueChange={toggleTheme}
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        }
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});