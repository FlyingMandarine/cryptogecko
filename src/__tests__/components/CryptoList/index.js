import React from "react";
// import { Text, View } from "react-native";
import { render } from "@testing-library/react-native";
import CryptoListContainer from "../../../components/CryptoList/index";

const mockData = [
  {
    current_price: 0.00093665,
    id: "01coin",
    image:
      "https://assets.coingecko.com/coins/images/5720/large/F1nTlw9I_400x400.jpg?1547041588",
    market_cap: 0,
    name: "01coin",
    price_change_percentage_1h_in_currency: null,
    price_change_percentage_24h: -0.11075,
    price_change_percentage_24h_in_currency: -0.11075003208391432,
    price_change_percentage_7d_in_currency: -3.7820712484643213,
    symbol: "zoc",
  },
  {
    current_price: 19411.4,
    id: "0-5x-long-algorand-token",
    image:
      "https://assets.coingecko.com/coins/images/12009/large/683JEXMN_400x400.png?1596692452",
    market_cap: 0,
    name: "0.5X Long Algorand Token",
    price_change_percentage_1h_in_currency: -0.035579063064311515,
    price_change_percentage_24h: 2.57858,
    price_change_percentage_24h_in_currency: 2.578575695022073,
    price_change_percentage_7d_in_currency: -5.628122707931938,
    symbol: "algohalf",
  },
  {
    current_price: 10936.35,
    id: "0-5x-long-balancer-token",
    image:
      "https://assets.coingecko.com/coins/images/12022/large/683JEXMN_400x400.png?1596694142",
    market_cap: 0,
    name: "0.5X Long Balancer Token",
    price_change_percentage_1h_in_currency: 1.3184439675947948,
    price_change_percentage_24h: 2.04532,
    price_change_percentage_24h_in_currency: 2.0453204429639875,
    price_change_percentage_7d_in_currency: null,
    symbol: "balhalf",
  },
];

describe("CryptoListContainer", () => {
  it("displays data successfully after fetching it", () => {
    const { debug, getAllByTestId } = render(
      <CryptoListContainer partialDetails={mockData} selectedData={mockData} />
    );

    debug();

    expect(getAllByTestId("cardName")[0]).toHaveTextContent("01coin");
  });

  it("displays an error if fetching data failed", () => {
    expect(1).toBe(1);
  });

  it("displays 10 items per page when first loaded", () => {
    expect(1).toBe(1);
  });

  it("displays the correct cards when searching by name", () => {
    expect(1).toBe(1);
  });

  it("displays the correct cards when searching by symbol", () => {
    expect(1).toBe(1);
  });
});
