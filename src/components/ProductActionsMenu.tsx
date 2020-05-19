import React from "react";
import { Menu, Button, MenuItem } from "@material-ui/core";

export function ProductActionsMenu() {
  const [anchorElement, setAnchorElement] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
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
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </>
  );
}
