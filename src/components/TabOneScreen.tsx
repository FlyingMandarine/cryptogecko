import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
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
  },
});

export default TabOneScreen;
