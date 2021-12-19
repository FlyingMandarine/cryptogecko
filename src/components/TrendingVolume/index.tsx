import React from "react";
import { FlatList, ListRenderItem } from "react-native";
import { Button } from "react-native-paper";

import { CryptoDetails } from "../../types/cryptoTypes";
import useVolumeData from "../../hooks/useVolumeData";
import SingleCryptoCard from "../CryptoList/SingleCryptoCard";
import ErrorMessage from "../ErrorMessage";

const renderItem: ListRenderItem<CryptoDetails> = ({ item }) => (
  <SingleCryptoCard item={item} />
);

const TrendingVolume = () => {
  const { volumeData, volumeDataError } = useVolumeData();

  if (volumeDataError) {
    return <ErrorMessage volumeDataError={volumeDataError} />;
  }

  if (!volumeData) {
    return (
      <Button loading style={{ height: "100%", justifyContent: "center" }}>
        Loading...
      </Button>
    );
  }

  return (
    <FlatList
      data={volumeData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default TrendingVolume;
