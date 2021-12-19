import React from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";

import { CryptoDetails } from "../../types/cryptoTypes";
import useVolumeData from "../../hooks/useVolumeData";
import SingleTrendingCard from "./SingleTrendingCard";
import ErrorMessage from "../ErrorMessage";

import styles from "../../constants/Styles";

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
