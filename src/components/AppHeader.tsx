import React from "react";
import { AppBar, Toolbar, Button, makeStyles } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { NavLink } from "react-router-dom";

interface Props {
  children?: React.ReactNode;
  toListButton?: boolean;
}

export function AppHeader({ children, toListButton }: Props) {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {toListButton && (
          <Button component={NavLink} color="inherit" to="/products">
            <ChevronLeft />
            TO PRODUCTS LIST
          </Button>
        )}
        {children}
      </Toolbar>
    </AppBar>
  );
}

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
});
