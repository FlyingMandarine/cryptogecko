import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

const PageSelection = ({
  pageCount,
  triggerPageChange,
  lastPage,
}: {
  pageCount: number;
  triggerPageChange: Function;
  lastPage: number | undefined;
}) => {
  return (
    <View style={styles.buttonsContainer}>
      {pageCount < 1 ? (
        <>
          <Button mode="contained" disabled compact>
            <Text>&lt;&lt;</Text>
          </Button>
          <Button mode="contained" disabled>
            <Text>&lt;</Text>
          </Button>
        </>
      ) : (
        <>
          <Button
            mode="contained"
            onPress={() => triggerPageChange("first")}
            color="mediumseagreen"
            compact
          >
            <Text>&lt;&lt;</Text>
          </Button>
          <Button
            mode="contained"
            onPress={() => triggerPageChange("previous")}
            color="mediumseagreen"
          >
            <Text>&lt;</Text>
          </Button>
        </>
      )}

      <Button mode="contained" disabled>
        {pageCount + 1}
      </Button>

      {pageCount === lastPage ? (
        <>
          <Button mode="contained" disabled>
            <Text>&gt;</Text>
          </Button>
          <Button mode="contained" disabled compact>
            <Text>&gt;&gt;</Text>
          </Button>
        </>
      ) : (
        <>
          <Button
            mode="contained"
            onPress={() => triggerPageChange("next")}
            color="mediumseagreen"
          >
            <Text>&gt;</Text>
          </Button>
          <Button
            mode="contained"
            onPress={() => triggerPageChange("last")}
            color="mediumseagreen"
            compact
          >
            <Text>&gt;&gt;</Text>
          </Button>
        </>
      )}
    </View>
  );
};

export default PageSelection;
