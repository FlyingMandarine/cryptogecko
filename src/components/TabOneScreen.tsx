import { Image, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types/types";

import CryptoList from "./CryptoList";

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
  return (
    <View style={styles.container}>
      <CryptoList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e4e8",
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // height: "100%",
  },
});

export default TabOneScreen;
