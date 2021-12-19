import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cryptoListContainer: {
    //backgroundColor: "#e1e4e8"
  },
  searchBar: {
    width: "90%",
    marginLeft: "5%",
  },
  switchView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e4e8",
  },
  switch: {
    marginHorizontal: 5,
  },
  separator: {
    marginVertical: 10,
    borderColor: "#e1e4e8",
    borderStyle: "solid",
    borderWidth: 5,
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
