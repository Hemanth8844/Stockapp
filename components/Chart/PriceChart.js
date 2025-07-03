import React from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "./PriceChartStyles";
export default function PriceChart({ data }) {
  const labels = data.map((point, idx) =>
    idx % 12 === 0
      ? `${String(new Date(point.x).getHours()).padStart(2, "0")}:${
          String(new Date(point.x).getMinutes()).padStart(2, "0")
        }`
      : ""
  );
  const values = data.map((p) => p.y);
  const chartData = { labels, datasets: [{ data: values }] };
  const screenWidth = Dimensions.get("window").width - 32;

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={200}
        bezier
        withDots={false}
        withInnerLines={false}
        withVerticalLines={false}
        withHorizontalLines={false}
    
        chartConfig={{
          backgroundGradientFrom: "#FFFFFF00", 
backgroundGradientTo: "#FFFFFF00",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0,0,255,${opacity})`,
          labelColor: (opacity = 1) => `rgba(128,128,128,${opacity})`,
          fillShadowGradient: "rgba(0,0,255,1)",
          fillShadowGradientOpacity: 0.2,
          propsForBackgroundLines: {
            strokeDasharray: "",
          },
        }}
        style={styles.chart}
        xLabelsOffset={-10}
        yLabelsOffset={10}
      />
    </View>
  );
}

