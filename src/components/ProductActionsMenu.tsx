import React, { useState, useRef } from "react";
import {
  Menu,
  Button,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { ProductDeleteDialogContent } from "./ProductDeleteDialogContent";
import { ProductView } from "./ProductView";
import { ProductEdit } from "./ProductEdit";

interface Props {
  productId: number;
}

export function ProductActionsMenu({ productId }: Props) {
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

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <ProductDeleteDialogContent
          productId={productId}
          onClose={() => setDeleteDialogOpen(false)}
        ></ProductDeleteDialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onClose={() => setViewDialogOpen(false)}>
        <DialogContent>
          <ProductView productId={productId}></ProductView>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogContent>
          <ProductEdit
            productId={productId}
            onSubmit={() => setEditDialogOpen(false)}
          ></ProductEdit>
        </DialogContent>
      </Dialog>
    </>
  );
}
