import { useEffect, useState } from "react";
import { CryptoData, CryptoDetails } from "../types/cryptoTypes";

const usePartialDetails = (partialData: CryptoData[] | undefined) => {
  const [partialDetails, setPartialDetails] = useState<
    CryptoDetails[] | undefined
  >();
  const [partialDetailsError, setPartialDetailsError] = useState<string>("");

  const fetchData = async () => {
    if (partialData && partialData.length === 0) {
      setPartialDetails([]);
      return;
    }

    const partialDataIds = partialData?.map((entry) => entry.id);

    // Uncomment the following line and comment out the one after to see an error message.
    // const url = `https://www.example.com/api/v3/coins/markets?vs_currency=usd&ids=${partialDataIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${partialDataIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`;

    await fetch(url)
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error(
            "Bad response from server when querying\n/api/v3/coins/markets"
          );
        }
        return response;
      })
      .then(async (returnedResponse) => {
        const json = await returnedResponse.json();
        setPartialDetails(json);
      })
      .catch((error) => {
        setPartialDetailsError(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [partialData]);

  return { partialDetails, partialDetailsError };
};

export default usePartialDetails;
