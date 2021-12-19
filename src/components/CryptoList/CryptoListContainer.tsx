import React from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { Searchbar, Switch } from "react-native-paper";

import { CryptoData, CryptoDetails } from "../../types/cryptoTypes";
import PageSelection from "./PageSelection";
import SingleCryptoCard from "./SingleCryptoCard";

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#e1e4e8"
  },
  searchBar: {
    width: "90%",
    marginLeft: "5%",
  },
  switchView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e4e8",
  },
  switch: {
    marginHorizontal: 5,
  },
  separator: {
    marginVertical: 10,
    borderColor: "#e1e4e8",
    borderStyle: "solid",
    borderWidth: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem: ListRenderItem<CryptoDetails> = ({ item }) => (
  <SingleCryptoCard item={item} />
);

const CryptoListContainer = ({
  searchQuery,
  isSwitchOn,
  pageCount,
  selectedData,
  partialDetails,
  onChangeSearch,
  onToggleSwitch,
  triggerPageChange,
}: {
  searchQuery: string;
  isSwitchOn: boolean | undefined;
  pageCount: number;
  selectedData: CryptoData[];
  partialDetails: CryptoDetails[];
  onChangeSearch: (query: string) => void;
  onToggleSwitch: ((value: boolean) => void | Promise<void>) & Function;
  triggerPageChange: Function;
}) => {
  return (
    <View style={styles.container}>
      <Searchbar
        autoComplete={""}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <View style={styles.switchView}>
        <Text>Search by Name</Text>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          color="grey"
          style={styles.switch}
        />
        <Text>Search by Symbol</Text>
      </View>
      <FlatList
        data={partialDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
      <PageSelection
        pageCount={pageCount}
        triggerPageChange={triggerPageChange}
        lastPage={selectedData && Math.ceil(selectedData.length / 10) - 1}
      />
    </View>
  );
};

export default CryptoListContainer;
