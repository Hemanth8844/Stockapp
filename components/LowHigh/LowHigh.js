import { View, Text} from "react-native";
import styles from "./LowHightStyles";
export default function LowHigh({ low, high, current }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>52 Week Range</Text>
      <Text style={styles.value}>
        {low} - {high}
      </Text>
      <Text style={styles.current}>Current: {current || "--"}</Text>
    </View>
  );
}

