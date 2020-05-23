import React from "react";
import { Typography, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Product } from "../services/ProductsService";
import { ProductActionsMenu } from "./ProductActionsMenu";
import { useDispatch } from "react-redux";
import { updateProduct } from "../state/reducers/productsList";
import { getValueRangeValidator } from "../validation/FormValidators";
import { QuickNumberInput } from "./QuickInput";

interface Props {
  product: Product;
}

export function ProductListEntryHeader({ product }: Props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const valueValidator = getValueRangeValidator(0, 100000);

  const confirmQuantity = (quantity: number) => {
    dispatch(updateProduct({ ...product, quantity }));
  };

  const confirmPrice = (price: number) => {
    dispatch(updateProduct({ ...product, price }));
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {product.name.toUpperCase()}
      </Typography>

      <QuickNumberInput
        label="Quantity"
        initialValue={product.quantity}
        onConfirm={confirmQuantity}
        validator={valueValidator}
      />

      <QuickNumberInput
        label="Price"
        initialValue={product.price}
        onConfirm={confirmPrice}
        validator={valueValidator}
      />

      <Typography color="textSecondary">Active</Typography>
      <Checkbox
        checked={product.active}
        onChange={(event, checked) =>
          dispatch(updateProduct({ ...product, active: checked }))
        }
      ></Checkbox>

      <ProductActionsMenu productId={product.id}></ProductActionsMenu>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between"
  },

  title: {
    fontSize: "1.5em",
    fontWeight: "bold"
  }
});
