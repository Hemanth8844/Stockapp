import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import StockCard from "../../../components/StockCard/StockCard";
import { getItems } from "../../../store/watchlist";
import { fetchQuote } from "../../../api/alphavantage";

export default function WatchlistDetail({ route, navigation }) {
  const { list } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadItems() {
      try {
        const tickers = await getItems(list);
        const detailedItems = await Promise.all(
          tickers.map(async (ticker) => {
            const { price, changePct } = await fetchQuote(ticker);
            return {
              ticker,
              price,
              change_amount: changePct,
            };
          })
        );

        if (isMounted) {
          setItems(detailedItems);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load watchlist items", err);
      }
    }

    loadItems();
    return () => {
      isMounted = false;
    };
  }, [list]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={({ ticker }) => ticker}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <StockCard
              ticker={item.ticker}
              price={item.price.toFixed(2)}
              change_amount={item.change_amount}  // ← pass the prop StockCard expects
              onPress={() =>
                navigation.navigate("Detail", { symbol: item.ticker })
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "white" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: {
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardWrapper: {
    flex: 1,
  },
});
