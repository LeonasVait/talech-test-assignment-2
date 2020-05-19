import React from "react";
import { List } from "@material-ui/core";

import { data } from "../fixtures/MockData";
import { ProductsListEntry } from "./ProductsListEntry";

export function ProductsList() {
  return (
    <List>
      {data.map((entry, index) => (
        <ProductsListEntry product={entry}></ProductsListEntry>
      ))}
    </List>
  );
}
