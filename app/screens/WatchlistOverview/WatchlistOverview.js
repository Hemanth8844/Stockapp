import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getWatchlists } from '../../../store/watchlist';
import { MaterialIcons } from '@expo/vector-icons';
import BottomNav from '../../../components/BottomNav/BottomNav';
import styles from './WatchlistOverviewStyle';
export default function WatchlistOverview({ navigation }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    getWatchlists().then(setLists);
  }, []);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Watchlists',

    });
  }, [navigation]);
  if (lists.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons name="playlist-add" size={64} color="#ccc" />
        <Text style={styles.emptyText}>No Watchlists yet</Text>
      </View>
    );
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('WatchlistDetail', { list: item })}
      activeOpacity={0.7}
    >
      <Text style={styles.cardText}>{item}</Text>
      <MaterialIcons name="chevron-right" size={24} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={(i) => i}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 8 }}
      />
      <BottomNav navigation={navigation} />
    </View>
  );
}
