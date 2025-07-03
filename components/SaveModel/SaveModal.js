import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; 
import { addToWatchlist, getWatchlists } from "../../store/watchlist";
import styles from "./SaveModelStyles";

export default function SaveModal({ visible, onClose, symbol }) {
  const [lists, setLists] = useState([]);
  const [newName, setNewName] = useState("");
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    if (visible) {
      getWatchlists().then(setLists);
      setSelectedList(null);
    }
  }, [visible]);

  const handleAddToList = async (name) => {
    setSelectedList(name);
    await addToWatchlist(name, symbol);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.header}>Add to Watchlist</Text>
          <View style={styles.newRow}>
            <TextInput
              placeholder="New Watchlist Name"
              value={newName}
              onChangeText={setNewName}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={async () => {
                const name = newName.trim();
                if (!name) return;
                setNewName("");
                await addToWatchlist(name, symbol);
                setSelectedList(name);
                const updated = await getWatchlists();
                setLists(updated);
                setTimeout(() => onClose?.(), 300);
              }}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={lists}
            keyExtractor={(i) => i}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.listRow}
                onPress={() => handleAddToList(item)}
              >
                <MaterialIcons
                  name={item === selectedList ? "check-box" : "check-box-outline-blank"}
                  size={20}
                  color={item === selectedList ? "#007AFF" : "#888"}
                  style={{ marginRight: 12 }}
                />
                <Text style={styles.listText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
