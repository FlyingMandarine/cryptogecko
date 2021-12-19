import * as WebBrowser from "expo-web-browser";
import { StyleSheet, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import { Text, View } from "../components/Themed";

export default function About({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.aboutContainer}>
        <Text
          style={styles.aboutText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          A mobile app to search and filter crypto info provided by the
          CoinGecko API.{"\n"}
          {"\n"}Made with React Native and TypeScript.
        </Text>
      </View>

      <View style={styles.githubContainer}>
        <TouchableOpacity onPress={handleLinkPress} style={styles.githubLink}>
          <Text style={styles.githubText} lightColor={Colors.light.tint}>
            GitHub
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleLinkPress() {
  WebBrowser.openBrowserAsync("https://github.com/FlyingMandarine/cryptogecko");
}

const styles = StyleSheet.create({
  aboutContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  aboutText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  githubContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  githubLink: {
    paddingVertical: 15,
  },
  githubText: {
    textAlign: "center",
  },
});
