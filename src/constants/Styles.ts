import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cryptoListContainer: {
    height: "100%",
  },
  searchBarContainer: {
    backgroundColor: "#e1e4e8",
  },
  searchBar: {
    width: "90%",
    marginLeft: "5%",
    marginTop: 10,
  },
  switchView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e4e8",
    marginTop: 5,
  },
  switch: {
    marginHorizontal: 5,
  },
  cardContainer: {
    marginVertical: 5,
    marginHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardCover: {
    width: 40,
    height: 40,
    marginHorizontal: 20,
    backgroundColor: "white",
  },
  cardTitleView: {},
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  cardBottomContainers: {
    alignItems: "center",
  },
});

export default styles;
