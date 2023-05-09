import React from "react";

export const FepkContext = React.createContext({
  fepkId: "",
  setFepkId: () => {},
  fepkMaker: "",
  setFepkMaker: () => {},
  filterQuery: "",
  setFilterQuery: () => {},
});
