import React from "react";
import { List } from "@material-ui/core";

import { data } from "../fixtures/MockData";
import { ProductsListEntry } from "./ProductsListEntry";

export function ProductsList() {
  return (
    <List>
      {data.length > 0
        ? data.map((entry, index) => (
            <ProductsListEntry product={entry}></ProductsListEntry>
          ))
        : "There are no products"}
    </List>
  );
}
