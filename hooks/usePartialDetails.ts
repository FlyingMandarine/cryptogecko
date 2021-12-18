import { useEffect, useState } from "react";
import { CryptoData, CryptoDetails } from "../cryptoTypes";

const usePartialDetails = (partialData: CryptoData[] | undefined) => {
  const [partialDetails, setPartialDetails] = useState<
    CryptoDetails[] | undefined
  >();

  const fetchData = async () => {
    if (partialData && partialData.length === 0) {
      setPartialDetails([]);
      return;
    }

    const partialDataIds = partialData?.map((entry) => entry.id);

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${partialDataIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

    // console.log('url is', url);

    const response = await fetch(url);
    const json = await response.json();

    // console.log("json is", json);

    setPartialDetails(json);
  };

  useEffect(() => {
    fetchData();
  }, [partialData]);

  return { partialDetails };
};

export default usePartialDetails;
