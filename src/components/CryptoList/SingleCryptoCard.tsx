import React from "react";
import { Image, Text, View } from "react-native";
import { CryptoDetails } from "../../types/cryptoTypes";
import styles from "../../constants/Styles";

const SingleCryptoCard = ({ item }: { item: CryptoDetails }) => {
  let formattedMarketCap = "0";
  let formattedPrice = "0";

  // For some reason, .toLocaleString() doesn't work, so I have to resort to good old regex.
  // A lot of cryptos show up at $0 because their price is incredibly low.
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
    <View key={item.id} style={styles.cardContainer}>
      <View style={styles.cardTop}>
        <Image source={{ uri: item.image }} style={styles.cardCover} />
        <View>
          <Text style={{ fontWeight: "bold" }} testID="cardName">
            {item.name}
          </Text>
          <Text>{item.symbol.toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.cardBottomContainers}>
          <Text>Price</Text>
          <Text style={{ fontWeight: "bold" }}>${formattedPrice}</Text>
        </View>
        <View style={styles.cardBottomContainers}>
          <Text>Market cap</Text>
          <Text style={{ fontWeight: "bold" }}>${formattedMarketCap}</Text>
        </View>
      </View>

      <View style={styles.cardBottom}>
        <View style={styles.cardBottomContainers}>
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
            {/* Using ((price + Number.EPSILON) * 1000) / 1000 to round up/down to two decimal points.  */}
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
        <View style={styles.cardBottomContainers}>
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
        <View style={styles.cardBottomContainers}>
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
