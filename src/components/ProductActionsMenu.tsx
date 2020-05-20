import React, { useState } from "react";
import {
  Menu,
  Button,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { ProductDeleteDialog } from "./ProductDeleteDialog";
import { Product } from "../fixtures/MockData";
import { ProductView } from "./ProductView";

interface Props {
  product: Product;
}

export function ProductActionsMenu({ product }: Props) {
  const [anchorElement, setAnchorElement] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);

  const handleClick = (event: any) => {
    event.stopPropagation();
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  const handleEdit = () => {
    handleClose();
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
    handleClose();
  };

  const handlePreview = () => {
    setViewDialogOpen(true);
    handleClose();
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Actions
      </Button>
      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        <MenuItem onClick={handlePreview}>Preview</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <ProductDeleteDialog
        open={isDeleteDialogOpen}
        product={product}
        onClose={() => setDeleteDialogOpen(false)}
      ></ProductDeleteDialog>

      <Dialog open={isViewDialogOpen} onClose={() => setViewDialogOpen(false)}>
        <DialogContent>
          <ProductView product={product}></ProductView>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}