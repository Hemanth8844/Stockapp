import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import DetailScreen from "./screens/DetailScreen/DetailScreen";
import GainersLosersScreen from "./screens/GainerLoserScreen/GainersLosersScreen";
import WatchlistDetail from "./screens/WatchListDetail/WatchlistDetail";
import WatchlistOverview from "./screens/WatchlistOverview/WatchlistOverview";
import SearchScreen from "./screens/SearchScreen/SearchScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="List"
        component={GainersLosersScreen}
        options={({ route }) => ({
          title:
            route.params?.type === "gainers" ? "Top Gainers" : "Top Losers",
        })}
      />

      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({
          title: route.params?.symbol,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Watchlists"
        component={WatchlistOverview}
        options={{ title: "Your Watchlists" }}
      />

      <Stack.Screen
        name="WatchlistDetail"
        component={WatchlistDetail}
        options={({ route }) => ({ title: route.params?.name })}
      />
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
