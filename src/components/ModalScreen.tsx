import { StatusBar } from "expo-status-bar";
import { Image, Platform, StyleSheet } from "react-native";

import About from "./About";
import { Text, View } from "../components/Themed";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CryptoGecko</Text>
      <Text style={styles.subtitle}>Powered by</Text>
      <View style={styles.geckoIconView}>
        <Image
          source={require("../assets/images/coingecko-logo.webp")}
          style={styles.geckoIcon}
        ></Image>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <About path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  geckoIconView: {
    height: 50,
    width: 145,
    marginLeft: 18,
  },
  geckoIcon: {
    flex: 1,
    aspectRatio: 2.5,
    resizeMode: "contain",
  },
});
