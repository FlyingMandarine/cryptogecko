import { useEffect, useState } from "react";
import { CryptoData } from "../types/cryptoTypes";

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

    // If quotation marks are found at either end of the whitespace-trimmed search,
    // then look for an exact match.
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
      // Else, just look for any strings that contain the searched query as a substring.
    } else {
      newData = cryptoList.filter((entry) =>
        entry[searchMode]
          .toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
      );
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
