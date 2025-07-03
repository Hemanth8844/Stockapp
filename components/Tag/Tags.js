import { Text, View } from "react-native";
import styles from "./TagStyles";
export default function Tags({ type, label }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>
        {type}: {label}
      </Text>
    </View>
  );
}
