import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types/types";

import CryptoList from "./CryptoList";

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CryptoGecko</Text>
      <Text style={styles.subtitle}>Powered by CoinGecko</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <CryptoList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default TabOneScreen;
