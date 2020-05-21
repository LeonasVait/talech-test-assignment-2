import React, { useState } from "react";
import {
  List,
  Fab,
  makeStyles,
  DialogContent,
  Dialog
} from "@material-ui/core";

import { getProducts } from "../services/ProductsService";
import { ProductsListEntry } from "./ProductsListEntry";
import { ProductEdit } from "./ProductEdit";

function getProductsList() {
  const data = getProducts();
  if (data.length > 0) {
    return data.map((entry, index) => (
      <ProductsListEntry product={entry} key={index}></ProductsListEntry>
    ));
  } else {
    //TODO create empty list placeholder
    return "There are no products";
  }
}

export function ProductsList() {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const classes = useStyles();
  return (
    <>
      <List>
        {getProductsList()}
        <div className={classes.listFooter}>
          <Fab
            color="primary"
            className={classes.fab}
            onClick={() => setEditDialogOpen(true)}
          >
            New
          </Fab>
        </div>
      </List>

      <Dialog open={isEditDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogContent>
          <ProductEdit onSubmit={() => setEditDialogOpen(false)}></ProductEdit>
        </DialogContent>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles({
  listFooter: {
    position: "relative",
    paddingBottom: "70px"
  },
  fab: {
    position: "absolute",
    right: "30px",
    top: 0
  }
});
