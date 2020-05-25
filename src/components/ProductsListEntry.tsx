import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Product } from "../services/ProductsService";
import { ProductListEntryHeader } from "./ProductsListEntryHeader";

interface Props {
  product: Product;
}

function ProductField({
  name,
  value,
  flex
}: {
  name: string;
  value: string;
  flex: string;
}) {
  const classes = useStyles();
  return (
    <div className={classes.fieldContainer} style={{ flex }}>
      <Typography className={classes.fieldName} color="textSecondary">
        {name}
      </Typography>
      <Typography className={classes.fieldValue}>{value}</Typography>
    </div>
  );
}

export function ProductsListEntry({ product }: Props) {
  const classes = useStyles();

  return (
    <>
      <Card
        className={
          product.quantity > 0
            ? classes.root
            : `${classes.root} ${classes.marked}`
        }
        elevation={3}
      >
        <CardContent className={classes.cardContent}>
          <ProductListEntryHeader product={product}></ProductListEntryHeader>

          <div className={classes.productFields}>
            <ProductField
              name={"Type"}
              value={product.type}
              flex="3"
            ></ProductField>

            <ProductField
              name={"EAN"}
              value={product.ean}
              flex="3"
            ></ProductField>

            <ProductField
              name={"Color"}
              value={product.color}
              flex="2"
            ></ProductField>

            <ProductField
              flex="none"
              name={"Weight kg"}
              value={product.weight.toFixed(2)}
            ></ProductField>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: "900px",
    margin: "30px"
  },

  cardContent: {
    padding: "16px"
  },

  marked: {
    backgroundColor: "rgba(255,0,0,0.2)"
  },
  productFields: {
    display: "flex"
  },
  fieldName: {
    marginRight: "10px"
  },
  fieldValue: {
    fontWeight: "bold"
  },
  fieldContainer: {
    marginRight: "10px",
    display: "flex",
    flex: "1",
    flexDirection: "row",
    alignItems: "center"
  }
});
