import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { fetchMovers } from "../../../api/alphavantage";
import StockCard from "../../../components/StockCard/StockCard";
import styles from "./GainerLoserStyles";
export default function GainersLosersScreen({ route, navigation }) {
  const { type } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovers()
      .then((data) => setItems(type === "gainers" ? data.top_gainers : data.top_losers))
      .finally(() => setLoading(false));
  }, [type]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.ticker}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <StockCard
              {...item}
              onPress={() => navigation.navigate("Detail", { symbol: item.ticker })}
            />
          </View>
        )}
      />
    </View>
  );
}


