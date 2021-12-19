import { useEffect, useState } from "react";
import { CryptoData, CryptoDetails } from "../types/cryptoTypes";

const useVolumeData = () => {
  const [volumeData, setVolumeData] = useState<CryptoDetails[] | undefined>();
  const [volumeDataError, setVolumeDataError] = useState<string>("");

  const fetchData = async () => {
    // Uncomment the following line and comment out the one after to see error message
    // const url = "https://www.example.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=100&page=1&sparkline=false";
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=100&page=1&sparkline=false";

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
        setVolumeData(json);
      })
      .catch((error) => {
        setVolumeDataError(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { volumeData, volumeDataError };
};

export default useVolumeData;
