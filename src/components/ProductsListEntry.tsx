import React from "react";
import { Card, CardContent, Typography, Checkbox } from "@material-ui/core";

import { Product } from "../fixtures/MockData";
import { makeStyles } from "@material-ui/styles";

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
    <Card className={classes.root} elevation={3}>
      <CardContent>
        <Typography className={classes.title}>
          {product.name.toUpperCase()}
        </Typography>
        <div className={classes.inner}>
          <ProductField
            name={"Type"}
            value={product.type}
            flex="3"
          ></ProductField>

          <ProductField
            name={"EAN"}
            value={product.ean}
            flex="2"
          ></ProductField>

          <ProductField
            name={"Color"}
            value={product.color}
            flex="2"
          ></ProductField>

          <ProductField
            flex="2"
            name={"Weight kg"}
            value={product.weight.toFixed(2)}
          ></ProductField>

          <div className={classes.fieldContainer}>
            <Typography color="textSecondary">Active</Typography>
            <Checkbox defaultChecked={product.active}></Checkbox>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
const useStyles = makeStyles({
  root: {
    margin: "20px"
  },
  inner: {
    display: "flex"
  },
  title: {
    fontSize: "2em",
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
    alignItems: "center"
  }
});
