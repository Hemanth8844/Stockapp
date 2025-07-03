import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1,backgroundColor:'white' },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 2,
  },
  cardWrapper: {
    flex: 1,
  },
});

export default styles