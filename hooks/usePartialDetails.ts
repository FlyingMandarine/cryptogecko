import { useEffect, useState } from "react";
import { CryptoData, CryptoDetails } from "../types";

const usePartialDetails = (partialData: CryptoData[] | undefined) => {
  const [partialDetails, setPartialDetails] = useState<
    CryptoDetails[] | undefined
  >();

  const fetchData = async () => {
    if (!partialDetails) {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    
      const response = await fetch(url);
      const json = await response.json();

      console.log('json is', json);

      setPartialDetails(json);
    }
    
    
  };

  useEffect(() => {
    fetchData();
  }, [partialData]);

  return { partialDetails };
};

export default usePartialDetails;
