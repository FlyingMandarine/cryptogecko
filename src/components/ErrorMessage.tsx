import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  errorView: {
    width: "90%",

    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: "red",
    borderWidth: 2,
  },
  errorWord: {
    fontWeight: "bold",
  },
});

const ErrorMessage = ({
  cryptoListError,
  partialDetailsError,
  volumeDataError,
}: {
  cryptoListError?: string;
  partialDetailsError?: string;
  volumeDataError?: string;
}) => {
  return (
    <View style={styles.errorView}>
      <Text>
        <Text style={styles.errorWord}>Error:</Text>{" "}
        {cryptoListError || partialDetailsError || volumeDataError}.
      </Text>
      <Text>{"\n"}Please check your Internet connection and try again.</Text>
    </View>
  );
};

export default ErrorMessage;
