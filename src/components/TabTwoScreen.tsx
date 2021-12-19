import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import TrendingVolume from "./TrendingVolume";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Top 100 Coins by Trading Volume</Text>
      </View>
      <TrendingVolume />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1e4e8",
  },
  titleView: {
    paddingVertical: 10,
  },
  titleText: {
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
