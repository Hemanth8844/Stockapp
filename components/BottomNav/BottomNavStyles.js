import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 45,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#ccc',
  },
  tabText: {
    color: '#333',
  },
});

export default styles