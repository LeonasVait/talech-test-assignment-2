import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

import { getProduct } from "../services/ProductsService";

interface Props {
  open: boolean;
  productId: number;
  onClose: () => void;
}

export function ProductDeleteDialog({ open, productId, onClose }: Props) {
  const handleClose = (isConfirmed: boolean) => {
    onClose();
    if (isConfirmed) {
      //TODO call ProductDelete action
      console.log(productId);
    }
  };

  const product = getProduct(productId);
  if (!product) {
    return (
      <Dialog
        onClose={() => handleClose(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogContentText>Product does not exist</DialogContentText>
        <Button onClick={() => handleClose(false)} color="primary" autoFocus>
          Cancel
        </Button>
      </Dialog>
    );
  }

  return (
    <Dialog
      onClose={() => handleClose(false)}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
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
    </Dialog>
  );
}
