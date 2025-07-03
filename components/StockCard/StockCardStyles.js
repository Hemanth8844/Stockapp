import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 4,
    alignItems: "left",
    justifyContent: "center",
    elevation: 2,
    maxWidth: 180,

  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 12,
    marginBottom:3
    
  },
  name: {
    fontWeight: "bold",
    color:'black',
    fontSize: 13,
  },
  price: {
    fontSize: 11,
    marginTop: 3,
  },
  change: {
    marginTop: 3,
    fontSize: 11,
  },
});

export default styles