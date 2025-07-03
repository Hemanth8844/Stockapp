import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  // screen
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  // empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },

  // each list‑item card
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 6,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 0,
    borderBottomColor:'gray',
    borderBottomWidth: 0.6,
    elevation: 0.3,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
  },
});


export default styles