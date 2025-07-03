import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './BottomNavStyles';
export default function BottomNav({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('Watchlists')}>
        <Text style={styles.tabText}>Watchlist</Text>
      </TouchableOpacity>
    </View>
  );
}
