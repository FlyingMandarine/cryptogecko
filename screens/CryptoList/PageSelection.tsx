import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";

const styles = StyleSheet.create({
  nextPageStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 50,
  },
});

const PageSelection = ({
  pageCount,
  triggerPageChange,
  lastPage
}: {
  pageCount: number;
  triggerPageChange: Function;
  lastPage: number | undefined;
}) => {
  return (
    <View style={styles.nextPageStyle}>
      {
        pageCount < 1 ?
          <>
            <Button mode="contained" disabled>
              <Text>First</Text>
            </Button>
            <Button mode="contained" disabled>
              <Text>Previous</Text>
            </Button>
          </>:
          <>
            <Button mode="contained" onPress={() => triggerPageChange("first")}>
              <Text>First</Text>
            </Button>
            <Button mode="contained" onPress={() => triggerPageChange("previous")}>
              <Text>Previous</Text>
            </Button>
          </>
      }

      <Button mode="contained" disabled>
        {pageCount + 1}
      </Button>

      {
        pageCount === lastPage ?
          <>
            <Button mode="contained" disabled>
              <Text>Next</Text>
            </Button>
            <Button mode="contained" disabled>
              <Text>Last</Text>
            </Button>
          </>:
          <>
            <Button mode="contained" onPress={() => triggerPageChange("next")}>
              <Text>Next</Text>
            </Button>
            <Button mode="contained" onPress={() => triggerPageChange("last")}>
              <Text>Last</Text>
            </Button>
          </>
      }
    </View>
  );
};

export default PageSelection;
