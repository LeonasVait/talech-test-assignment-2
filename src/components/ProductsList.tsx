import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { List, Fab, makeStyles } from "@material-ui/core";

import { Product } from "../services/ProductsService";
import { ProductsListEntry } from "./ProductsListEntry";
import { loadProducts } from "../state/reducers/productsList";

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
            New
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
  fab: {
    position: "absolute",
    right: "30px",
    top: 0
  }
});
