import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  appHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  fakeSearch: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 35,
    justifyContent: "center",
    width: 150,
  },
  fakeSearchText: {
    color: "#999",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
  seeMore: {
    fontSize: 14,
    color: "#007AFF",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


export default styles