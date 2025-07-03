import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  cancel: {
    marginLeft: 8,
    color: "#007AFF",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResults: {
    fontSize: 14,
    color: "red",
  },
});

export default styles