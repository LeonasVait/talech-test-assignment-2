import React from "react";
import { Menu, Button, MenuItem } from "@material-ui/core";
import { ProductDeleteDialog } from "./ProductDeleteDialog";
import { Product } from "../fixtures/MockData";

interface Props {
  product: Product;
}

export function ProductActionsMenu({ product }: Props) {
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleClick = (event: any) => {
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
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <ProductDeleteDialog
        open={isDeleteDialogOpen}
        product={product}
        onClose={() => setDeleteDialogOpen(false)}
      ></ProductDeleteDialog>
    </>
  );
}
