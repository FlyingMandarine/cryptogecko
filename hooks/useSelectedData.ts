import { useEffect, useState } from "react";
import { CryptoData } from "../cryptoTypes";

const useSelectedData = (
  cryptoList: CryptoData[] | undefined,
  isSwitchOn: Boolean,
  debouncedSearchQuery: string
) => {
  const [selectedData, setSelectedData] = useState<CryptoData[] | undefined>(
    cryptoList
  );
  const [loading, setLoading] = useState(false);

  const sortData = async () => {
    setLoading(true);

    if (!cryptoList) {
      return;
    }

    const searchMode = isSwitchOn ? "symbol" : "name";

    let newData: CryptoData[] = [];

    if (
      debouncedSearchQuery[0] === '"' &&
      debouncedSearchQuery[debouncedSearchQuery.length - 1] === '"'
    ) {
      const trimmedQuery = debouncedSearchQuery.substring(
        1,
        debouncedSearchQuery.length - 1
      );
      const entry = cryptoList.find(
        (entry) =>
          entry[searchMode].toLowerCase() === trimmedQuery.toLowerCase()
      );

      if (entry) {
        newData.push(entry);
      }
    } else {
      newData = cryptoList.filter((entry) =>
        entry[searchMode]
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );

      console.log('newData is', newData);
      
    }

    setLoading(false);
    setSelectedData(newData);
  };

  useEffect(() => {
    sortData();
  }, [cryptoList, debouncedSearchQuery, isSwitchOn]);

  return { selectedData, loading };
};

export default useSelectedData;
