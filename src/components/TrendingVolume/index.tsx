import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import { CryptoDetails } from "../../types/cryptoTypes";
import useVolumeData from "../../hooks/useVolumeData";
import SingleTrendingCard from "./SingleTrendingCard";
import ErrorMessage from "../ErrorMessage";

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    borderColor: "#e1e4e8",
    borderStyle: "solid",
    borderWidth: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem: ListRenderItem<CryptoDetails> = ({ item }) => (
  <SingleTrendingCard item={item} />
);

const TrendingVolume = () => {
  const { volumeData, volumeDataError } = useVolumeData();

  if (volumeDataError) {
    return <ErrorMessage volumeDataError={volumeDataError} />;
  }

  return (
    <FlatList
      data={volumeData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default TrendingVolume;
