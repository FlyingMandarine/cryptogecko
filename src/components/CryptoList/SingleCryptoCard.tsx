import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { CryptoDetails } from "../../types/cryptoTypes";

const styles = StyleSheet.create({
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardCover: {
    width: 40,
    height: 40,
    marginHorizontal: 20,
    backgroundColor: "white",
  },
  cardTitleView: {},
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  bottomContainers: {
    alignItems: "center",
  },
});

const SingleCryptoCard = ({ item }: { item: CryptoDetails }) => {
  let formattedMarketCap = "0";
  let formattedPrice = "0";

  if (item.market_cap !== null) {
    formattedMarketCap = item.market_cap
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (item.current_price !== null) {
    const roundedPrice: string = (
      Math.round(item.current_price * 100) / 100
    ).toFixed(2);
    formattedPrice = roundedPrice
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <View key={item.id}>
      <View style={styles.cardTop}>
        <Image source={{ uri: item.image }} style={styles.cardCover} />
        <View>
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>{item.symbol.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.bottomContainers}>
          <Text>Price</Text>
          <Text style={{ fontWeight: "bold" }}>${formattedPrice}</Text>
        </View>
        <View style={styles.bottomContainers}>
          <Text>Market cap</Text>
          <Text style={{ fontWeight: "bold" }}>${formattedMarketCap}</Text>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.bottomContainers}>
          <Text>1h</Text>
          <Text
            style={{
              fontWeight: "bold",
              color:
                item.price_change_percentage_1h_in_currency < 0
                  ? "red"
                  : "green",
            }}
          >
            {item.price_change_percentage_1h_in_currency
              ? Math.round(
                  (item.price_change_percentage_1h_in_currency +
                    Number.EPSILON) *
                    1000
                ) / 1000
              : 0}
            %
          </Text>
        </View>
        <View style={styles.bottomContainers}>
          <Text>24h</Text>
          <Text
            style={{
              fontWeight: "bold",
              color: item.price_change_percentage_24h < 0 ? "red" : "green",
            }}
          >
            {item.price_change_percentage_24h
              ? Math.round(
                  (item.price_change_percentage_24h + Number.EPSILON) * 1000
                ) / 1000
              : 0}
            %
          </Text>
        </View>
        <View style={styles.bottomContainers}>
          <Text>7d</Text>
          <Text
            style={{
              fontWeight: "bold",
              color:
                item.price_change_percentage_7d_in_currency < 0
                  ? "red"
                  : "green",
            }}
          >
            {item.price_change_percentage_7d_in_currency
              ? Math.round(
                  (item.price_change_percentage_7d_in_currency +
                    Number.EPSILON) *
                    1000
                ) / 1000
              : 0}
            %
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SingleCryptoCard;
