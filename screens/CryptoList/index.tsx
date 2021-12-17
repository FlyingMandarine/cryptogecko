import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";

import { CryptoData } from "../../types";
import PageSelection from "./PageSelection";

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    backgroundColor: 'grey',
  },
});

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[] | undefined>();

  const [partialData, setPartialData] = useState<CryptoData[] | undefined>();
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/list"
      );
      const json = await response.json();
      setCryptoData(json);

      const entries: any = json.slice(0, 10);
      setPartialData(entries);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newPageData = cryptoData?.slice(pageCount * 10, pageCount * 10 + 10)
    setPartialData(newPageData)
  }, [pageCount]);

  if (!partialData) {
    return (
      <Text>Loading...</Text>
    );
  }

  const renderItem: ListRenderItem<CryptoData> = ({ item }) => (
    <View key={item.id}>
      <Text>Name is: {item.name}</Text>
      <Text>Symbol is: {item.symbol}</Text>
    </View>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  const triggerPageChange: Function = (page: string) => {
      const newPage = () => {
        switch(page) {
        case 'first':
          return 0;
        case 'previous':
          return pageCount - 1;
        case 'next':
          return pageCount + 1;
        case 'last':
          if (cryptoData) {
            return Math.ceil(cryptoData.length / 10) - 1;
          }
        default:
          throw new Error(`An error occurred when navigating away from page ${pageCount}.`);
      }
    }

    setPageCount(newPage);
  };

  return (
    <View>
      <FlatList
        data={partialData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
      <PageSelection
        pageCount={pageCount}
        triggerPageChange={triggerPageChange}
      />
    </View>
  );
};

export default CryptoList;
