import React, { useState, useRef } from "react";
import {
  Menu,
  Button,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  ClickAwayListener
} from "@material-ui/core";
import { ProductDeleteDialog } from "./ProductDeleteDialog";
import { Product } from "../fixtures/MockData";
import { ProductView } from "./ProductView";
import { ProductEdit } from "./ProductEdit";

interface Props {
  product: Product;
}

export function ProductActionsMenu({ product }: Props) {
  const anchorRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
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
        onClick={openMenu}
        ref={anchorRef}
      >
        Actions
      </Button>

      <Menu
        anchorEl={anchorRef.current}
        open={isMenuOpen}
        keepMounted
        onClose={handleClose}
      >
        <MenuItem onClick={() => handlePreview()}>Preview</MenuItem>

        <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>

        <MenuItem onClick={() => handleDelete()}>Delete</MenuItem>
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

      <Dialog open={isEditDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogContent>
          <ProductEdit product={product}></ProductEdit>
        </DialogContent>
      </Dialog>
    </>
  );
}
