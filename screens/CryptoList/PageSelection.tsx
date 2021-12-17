import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  nextPageStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 50,
  },
});

const PageSelection = ({ pageCount, triggerPageChange }: { pageCount: number, triggerPageChange: Function }) => {
  return (
    <View style={styles.nextPageStyle}>
      <Pressable onPress={() => triggerPageChange('first')}><Text>First</Text></Pressable>
      <Pressable onPress={() => triggerPageChange('previous')}><Text>Previous</Text></Pressable>
      <Text>{pageCount + 1}</Text>
      <Pressable onPress={() => triggerPageChange('next')}><Text>Next</Text></Pressable>
      <Pressable onPress={() => triggerPageChange('last')}><Text>Last</Text></Pressable>
    </View>
  );
};

export default PageSelection;