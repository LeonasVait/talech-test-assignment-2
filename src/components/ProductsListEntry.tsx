import React from "react";
import { Card } from "@material-ui/core";

import { Product } from "../fixtures/MockData";

interface Props {
  product: Product;
}

export function ProductsListEntry({ product }: Props) {
  return <Card>{JSON.stringify(product)}</Card>;
}
