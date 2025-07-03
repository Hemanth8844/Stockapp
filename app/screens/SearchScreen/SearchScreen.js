import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { fetchQuote } from "../../../api/alphavantage";
import StockCard from "../../../components/StockCard/StockCard";
import styles from "./SearchScreenStyle"
export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim()) {
        handleSearch(query.trim());
      } else {
        setResult(null);
        setNoResult(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSearch = async (q) => {
    setLoading(true);
    setNoResult(false);
    try {
      const res = await fetchQuote(q);
      if (res && res.price) {
        setResult({
          ticker: res.symbol || q.toUpperCase(),
          price: parseFloat(res.price),
          change_amount: parseFloat(res.change), 
        });
        setNoResult(false);
      } else {
        setResult(null);
        setNoResult(true);
      }
    } catch (e) {
      setResult(null);
      setNoResult(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <TextInput
          style={styles.input}
          placeholder="Search stocks..."
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      )}

      {!loading && noResult && (
        <View style={styles.centered}>
          <Text style={styles.noResults}>No matching stock found.</Text>
        </View>
      )}

      {!loading && result && (
        <FlatList
          data={[result]}
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
      )}
    </View>
  );
}