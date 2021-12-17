import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { Button, Card, Searchbar } from "react-native-paper";

import { CryptoData } from "../../types";
import PageSelection from "./PageSelection";

const styles = StyleSheet.create({
  separator: {
    marginVertical: 10,
    borderColor: "blue",
    borderStyle: "solid",
    borderWidth: 5
  },
});

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[] | undefined>();

  const [partialData, setPartialData] = useState<CryptoData[] | undefined>();
  const [pageCount, setPageCount] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);

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

  useEffect(() => {
    // Not practical to have both search types mixed up; find a way to separate them both.

    // Don't forget to add debouncing
    if (cryptoData) {
      const newNameData: CryptoData[] = cryptoData.filter(entry => entry.name.includes(searchQuery));
      const newSymbolData: CryptoData[] = cryptoData.filter(entry => entry.symbol.includes(searchQuery));
      const newData: CryptoData[] = newNameData.concat(newSymbolData);
      setPartialData(newData);
    }
  }, [searchQuery]);

  if (!partialData) {
    return (
      <Button loading>Loading...</Button>
    );
  }

  const renderItem: ListRenderItem<CryptoData> = ({ item }) => (
    <Card key={item.id}>
      <Card.Title title={item.name} />
      <Card.Content>
        <Text>Symbol is: {item.symbol}</Text>
      </Card.Content>
    </Card>
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
      <Searchbar
        autoComplete={''}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
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
