import React, { useState, useRef } from "react";
import { Menu, Button, MenuItem, Dialog } from "@material-ui/core";
import { ProductDeleteDialogContent } from "./ProductDeleteDialogContent";
import { NavLink } from "react-router-dom";

interface Props {
  productId: number;
}

export function ProductActionsMenu({ productId }: Props) {
  const anchorRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const handleClose = () => {
    setMenuOpen(false);
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
        <MenuItem component={NavLink} to={`/products/${productId}`}>
          Preview
        </MenuItem>

        <MenuItem component={NavLink} to={`/products/${productId}/edit`}>
          Edit
        </MenuItem>

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
    </>
  );
}
