import { useEffect, useState } from "react";
import { CryptoData } from "../types/cryptoTypes";

const useCryptoList = () => {
  const [cryptoList, setCryptoList] = useState<CryptoData[] | undefined>();
  const [cryptoListError, setCryptoListError] = useState<string>("");

  const fetchData = async () => {
    // Uncomment the next line and comment out the one after to see error message
    // await fetch("https://www.example.com/api/v3/coins/list")
    await fetch("https://api.coingecko.com/api/v3/coins/list")
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error(
            "Bad response from server when querying\n/api/v3/coins/list"
          );
        }
        return response;
      })
      .then(async (returnedResponse) => {
        const json = await returnedResponse.json();
        setCryptoList(json);
      })
      .catch((error) => {
        setCryptoListError(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { cryptoList, cryptoListError };
};

export default useCryptoList;
