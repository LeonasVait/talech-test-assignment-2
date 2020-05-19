import React from "react";
import { Product } from "../fixtures/MockData";
import { makeStyles, Typography } from "@material-ui/core";

interface Props {
  product: Product;
}

function ProductField({ name, value }: { name: string; value: string }) {
  const classes = useStyles();
  return (
    <div className={classes.fieldContainer}>
      <Typography className={classes.fieldName} color="textSecondary">
        {name}
      </Typography>
      <Typography className={classes.fieldValue}>{value}</Typography>
    </div>
  );
}

export function ProductView({ product }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {product.name.toUpperCase()}
      </Typography>

      <ProductField name={"Type"} value={product.type}></ProductField>

      <ProductField name={"EAN"} value={product.ean}></ProductField>

      <ProductField name={"Color"} value={product.color}></ProductField>

      <ProductField
        name={"Weight kg"}
        value={product.weight.toFixed(2)}
      ></ProductField>

      <ProductField
        name={"Active"}
        value={product.active ? "Enabled" : "Disabled"}
      ></ProductField>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    margin: "20px"
  },
  productHeader: {
    display: "flex",
    justifyContent: "space-between"
  },
  productFields: {
    display: "flex"
  },
  title: {
    fontSize: "1.5em",
    fontWeight: "bold"
  },
  fieldName: {
    marginRight: "10px"
  },
  fieldValue: {
    fontWeight: "bold"
  },
  fieldContainer: {
    margin: "10px",
    display: "flex",
    flex: "1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
