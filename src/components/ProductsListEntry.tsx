import React from "react";
import { Card, CardContent, Typography, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Product } from "../services/ProductsService";
import { ProductActionsMenu } from "./ProductActionsMenu";
import { useDispatch } from "react-redux";
import { updateProduct } from "../state/reducers/productsList";

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
  const dispatch = useDispatch();

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
        <CardContent>
          <div className={classes.productHeader}>
            <Typography className={classes.title}>
              {product.name.toUpperCase()}
            </Typography>

            <ProductActionsMenu productId={product.id}></ProductActionsMenu>
          </div>

          <div className={classes.productFields}>
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

            <ProductField
              flex="2"
              name={"Quantity"}
              value={product.quantity.toFixed(2)}
            ></ProductField>

            <ProductField
              flex="2"
              name={"Price"}
              value={product.price.toFixed(2)}
            ></ProductField>

            <div className={classes.fieldContainer}>
              <Typography color="textSecondary">Active</Typography>
              <Checkbox
                checked={product.active}
                onChange={(event, checked) =>
                  dispatch(updateProduct({ ...product, active: checked }))
                }
              ></Checkbox>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

const useStyles = makeStyles({
  root: {
    minWidth: "900px",
    margin: "20px"
  },

  marked: {
    backgroundColor: "rgba(255,0,0,0.2)"
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
    alignItems: "center"
  }
});
