import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { CryptoDetails } from "../../cryptoTypes";

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
  const marketCapWithCommas = item.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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
          <Text style={{ fontWeight: "bold" }}>${item.current_price}</Text>
        </View>
        <View style={styles.bottomContainers}>
          <Text>Market cap</Text>
          <Text style={{ fontWeight: "bold" }}>${marketCapWithCommas}</Text>
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
