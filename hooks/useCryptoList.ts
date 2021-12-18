import { useEffect, useState } from "react";
import { CryptoData } from "../types";

const useCryptoList = () => {
  const [cryptoList, setCryptoList] = useState<CryptoData[] | undefined>();

  const fetchData = async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
    const json = await response.json();

    setCryptoList(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { cryptoList };
};

export default useCryptoList;
