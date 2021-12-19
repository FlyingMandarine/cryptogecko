import React from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";
import { Searchbar, Switch } from "react-native-paper";

import { CryptoData, CryptoDetails } from "../../types/cryptoTypes";
import PageSelection from "./PageSelection";
import SingleCryptoCard from "./SingleCryptoCard";

import styles from "../../constants/Styles";

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
    <View style={styles.cryptoListContainer}>
      <View style={styles.searchBarContainer}>
        <Searchbar
          autoComplete={""}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
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
      />
      {/* There are ten cryptos per page, therefore the maximum number of pages is the total
      number of cryptos divided by 10 (minus 1 as we start on page 1 and not on page 0). */}
      <PageSelection
        pageCount={pageCount}
        triggerPageChange={triggerPageChange}
        lastPage={selectedData && Math.ceil(selectedData.length / 10) - 1}
      />
    </View>
  );
};

export default CryptoListContainer;
