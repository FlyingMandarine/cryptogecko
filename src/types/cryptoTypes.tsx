export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
}

export interface CryptoDetails {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency: number;
}
