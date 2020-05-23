import React, { useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../state/reducers/productEdit";

interface Props {
  productId: number;
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

export function ProductView({ productId }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const product = useSelector((state: any) => state.activeProduct.product);
  const isLoading = useSelector((state: any) => state.activeProduct.isLoading);

  useEffect(() => {
    dispatch(loadProduct(productId));
  }, [dispatch, productId]);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!product) {
    return <div>product does not exist</div>;
  }

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
