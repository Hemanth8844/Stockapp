
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./StockCardStyles";
export default function StockCard({ ticker, price, change_amount, change_percentage, onPress }) {
  const color = getRandomColor();
  const isPositive = change_amount >= 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.logo, { backgroundColor: color }]} />
      <Text style={styles.name}>{ticker}</Text>
      <Text style={styles.price}>{`$${parseFloat(price).toFixed(2)}`}</Text>
      <Text style={[styles.change, { color: isPositive ? "green" : "red" }]}
        >
          {`${isPositive ? "+" : ""}${change_amount}`}
        </Text>
    </TouchableOpacity>
  );
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
