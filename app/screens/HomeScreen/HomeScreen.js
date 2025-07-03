import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { fetchMovers } from "../../../api/alphavantage";
import StockCard from "../../../components/StockCard/StockCard";
import BottomNav from "../../../components/BottomNav/BottomNav";
import styles from "./HomeScreenStyle"
export default function HomeScreen({ navigation }) {
  const [data, setData] = useState({ top_gainers: [], top_losers: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovers()
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  const renderSection = (title, listData, type) => (
    <>
      <View style={styles.headerRow}>
        <Text style={styles.header}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("List", { type })}>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listData.slice(0, 4)}
        numColumns={2}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <StockCard
            {...item}
            onPress={() =>
              navigation.navigate("Detail", { symbol: item.ticker })
            }
          />
        )}
      />
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.appHeader}>
        <Text style={styles.appTitle}>Stocks App</Text>
        <TouchableOpacity
          style={styles.fakeSearch}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={styles.fakeSearchText}>Search here...</Text>
        </TouchableOpacity>
      </View>

      {renderSection("Top Gainers", data.top_gainers, "gainers")}
      {renderSection("Top Losers", data.top_losers, "losers")}
      <BottomNav navigation={navigation} />
    </View>
  );
}
