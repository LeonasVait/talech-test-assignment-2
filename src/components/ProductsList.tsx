import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { List, Fab, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { Product } from "../services/ProductsService";
import { ProductsListEntry } from "./ProductsListEntry";
import { loadProducts } from "../state/reducers/productsList";
import { AppHeader } from "./AppHeader";

function getProductsList(data: Product[]) {
  return data.map((entry, index) => (
    <ProductsListEntry product={entry} key={index}></ProductsListEntry>
  ));
}

export function ProductsList() {
  const data = useSelector<any, Product[]>(
    (state: any) => state.productsList.products
  );
  const isLoading = useSelector<any, boolean>(
    (state: any) => state.productsList.isLoading
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const classes = useStyles();
  return (
    <>
      <AppHeader>
        <Typography>PRODUCTS LIST</Typography>
      </AppHeader>
      {isLoading && <div>loading products</div>}
      {!isLoading && data.length === 0 && <div>There are no products</div>}
      <List>
        {data.length > 0 && getProductsList(data)}
        <div className={classes.listFooter}>
          <Fab
            color="primary"
            className={classes.fab}
            component={NavLink}
            to="/products/create"
          >
            <AddIcon />
          </Fab>
        </div>
      </List>
    </>
  );
}

const useStyles = makeStyles({
  listFooter: {
    position: "relative",
    paddingBottom: "70px"
  },
  title: { fontSize: "1.5em", margin: "30px 30px 0 30px" },
  fab: {
    position: "absolute",
    right: "30px",
    top: 0
  }
});
