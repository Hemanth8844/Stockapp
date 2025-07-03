import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    position: "relative",
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: "60%",
  },
  closeIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: 4,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  newRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  listContainer: {
    paddingBottom: 16,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  listText: {
    fontSize: 16,
    color: "#333",
  },
});


export default styles