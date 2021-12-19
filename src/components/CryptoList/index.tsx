import React, { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useDebounce } from "use-debounce";

import { CryptoData } from "../../types/cryptoTypes";

import useCryptoList from "../../hooks/useCryptoList";
import useSelectedData from "../../hooks/useSelectedData";
import usePartialDetails from "../../hooks/usePartialDetails";

import CryptoListContainer from "./CryptoListContainer";
import ErrorMessage from "../ErrorMessage";

const CryptoList = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // searchQuery is used to update the search field while debouncedSearchQuery is used to fetch data
  // after half a second to prevent having to fetch it every time the user presses a key.
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery.trim(), 500);

  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  // The entire list of cryptos, fetched only upon starting the app.
  const { cryptoList, cryptoListError } = useCryptoList();

  // The entries from cryptoList, minus the ones that have been filtered out if a search was done.
  const { selectedData, loading } = useSelectedData(
    cryptoList,
    isSwitchOn,
    debouncedSearchQuery
  );

  // The paginated cryptos (max 10 entries) extracted from selectedData.
  const [partialData, setPartialData] = useState<CryptoData[] | undefined>();

  // The detailed info (including percentage changes) for the cryptos on the current page (partialData).
  const { partialDetails, partialDetailsError } =
    usePartialDetails(partialData);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  // Change the paginated entries if the data changes or the user goes to another page.
  useEffect(() => {
    const newPageData = selectedData?.slice(
      pageCount * 10,
      pageCount * 10 + 10
    );

    setIsLoading(false);

    if (partialData !== newPageData) {
      setPartialData(newPageData);
    }
  }, [cryptoList, pageCount, selectedData]);

  // If the data changes, go back to page 1.
  useEffect(() => {
    setPageCount(0);
  }, [selectedData]);

  if (cryptoListError || partialDetailsError) {
    return (
      <ErrorMessage
        cryptoListError={cryptoListError}
        partialDetailsError={partialDetailsError}
      />
    );
  }

  if (!partialData || isLoading === true || loading === true) {
    return (
      <Button loading style={{ height: "100%", justifyContent: "center" }}>
        Loading...
      </Button>
    );
  }

  const triggerPageChange: Function = (page: string) => {
    setIsLoading(true);
    const newPage = () => {
      switch (page) {
        case "first":
          return 0;
        case "previous":
          return pageCount - 1;
        case "next":
          return pageCount + 1;
        case "last":
          if (selectedData) {
            return Math.ceil(selectedData.length / 10) - 1;
          }
        default:
          throw new Error(
            `An error occurred when navigating away from page ${pageCount}.`
          );
      }
    };

    setPageCount(newPage);
  };

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  if (selectedData && partialDetails) {
    return (
      <CryptoListContainer
        searchQuery={searchQuery}
        isSwitchOn={isSwitchOn}
        pageCount={pageCount}
        selectedData={selectedData}
        partialDetails={partialDetails}
        onChangeSearch={onChangeSearch}
        onToggleSwitch={onToggleSwitch}
        triggerPageChange={triggerPageChange}
      />
    );
  } else {
    return null;
  }
};

export default CryptoList;
