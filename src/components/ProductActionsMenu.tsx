import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  MenuItem,
  Dialog,
  IconButton,
  makeStyles
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import { ProductDeleteDialogContent } from "./ProductDeleteDialogContent";

interface Props {
  productId: number;
}

export function ProductActionsMenu({ productId }: Props) {
  const classes = useStyles();
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
      <IconButton
        className={classes.actionsButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={openMenu}
        ref={anchorRef}
        style={{ flex: "none" }}
      >
        <MenuIcon />
      </IconButton>

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

const useStyles = makeStyles({
  actionsButton: {
    width: "42px",
    height: "42px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  activeInput: {
    display: "flex",
    alignItems: "center"
  },

  title: {
    fontSize: "1.5em",
    fontWeight: "bold"
  }
});
