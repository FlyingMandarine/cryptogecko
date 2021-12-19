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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery.trim(), 500);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const [partialData, setPartialData] = useState<CryptoData[] | undefined>();

  const { cryptoList, cryptoListError } = useCryptoList();
  const { selectedData, loading } = useSelectedData(
    cryptoList,
    isSwitchOn,
    debouncedSearchQuery
  );
  const { partialDetails, partialDetailsError } =
    usePartialDetails(partialData);

  const onChangeSearch = (query: string) => setSearchQuery(query);

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
