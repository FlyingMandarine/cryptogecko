import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { Button, Searchbar, Switch } from "react-native-paper";
import { useDebounce } from "use-debounce";

import { CryptoData, CryptoDetails } from "../../types/cryptoTypes";
import PageSelection from "./PageSelection";

import useCryptoList from "../../hooks/useCryptoList";
import useSelectedData from "../../hooks/useSelectedData";
import usePartialDetails from "../../hooks/usePartialDetails";
import SingleCryptoCard from "./SingleCryptoCard";

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    borderColor: "#e1e4e8",
    borderStyle: "solid",
    borderWidth: 5,
  },
  switchView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  switch: {
    marginHorizontal: 5,
  },
});

const CryptoList = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [partialData, setPartialData] = useState<CryptoData[] | undefined>();

  const { cryptoList } = useCryptoList();
  const { selectedData, loading } = useSelectedData(
    cryptoList,
    isSwitchOn,
    debouncedSearchQuery
  );
  const { partialDetails } = usePartialDetails(partialData);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  useEffect(() => {
    const newPageData = selectedData?.slice(
      pageCount * 10,
      pageCount * 10 + 10
    );

    setIsLoading(false);

    if (partialData !== newPageData) {
      setPartialData(newPageData);
    }
  }, [cryptoList, pageCount, selectedData]);

  useEffect(() => {
    setPageCount(0);
  }, [selectedData]);

  if (!partialData || isLoading === true || loading === true) {
    return <Button loading>Loading...</Button>;
  }

  // if (partialDetails) {
  //   console.log(typeof partialDetails[0].market_cap);

  //   console.log('hello is', parseInt( '1000000' ).toLocaleString());

  //   console.log('miteux is', Number(partialDetails[0].market_cap.toLocaleString("fr-FR")));
  // }

  const renderItem: ListRenderItem<CryptoDetails> = ({ item }) => (
    <SingleCryptoCard item={item} />
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  const triggerPageChange: Function = (page: string) => {
    // console.log("Loading...");
    setIsLoading(true);
    const newPage = () => {
      switch (page) {
        case "first":
          return 0;
        case "previous":
          return pageCount - 1;
        case "next":
          return pageCount + 1;
        case "last":
          if (selectedData) {
            return Math.ceil(selectedData.length / 10) - 1;
          }
        default:
          throw new Error(
            `An error occurred when navigating away from page ${pageCount}.`
          );
      }
    };

    setPageCount(newPage);
  };

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View>
      <Searchbar
        autoComplete={""}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
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

export default CryptoList;
