import React, { useEffect } from "react";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { loadProduct, deleteProduct } from "../state/reducers/productEdit";

interface Props {
  productId: number;
  onClose: () => void;
}

export function ProductDeleteDialogContent({ productId, onClose }: Props) {
  const product = useSelector((state: any) => state.activeProduct.product);
  const isLoading = useSelector((state: any) => state.activeProduct.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProduct(productId));
  }, [dispatch, productId]);

  const handleClose = (isConfirmed: boolean) => {
    if (isConfirmed) {
      dispatch(deleteProduct(product));
    }
    onClose();
  };

  if (isLoading) {
    return (
      <>
        <DialogContent>
          <DialogContentText>Loading</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <DialogContent>
          <DialogContentText>Product does not exist</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </>
    );
  }

  return (
    <>
      <DialogTitle>"You are about to delete a product"</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will delete the item {product.name}. This action is irreversible.
          Do you want to confirm?
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => handleClose(true)} color="primary">
            Confirm
          </Button>
          <Button onClick={() => handleClose(false)} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  );
}
