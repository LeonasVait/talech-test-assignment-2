import React, { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../state/reducers/productEdit";
import { ProductDetails } from "./ProductDetails";
import { HistoryView } from "./HistoryView";
import { useParams, NavLink, Redirect } from "react-router-dom";

export function ProductView() {
  const [activeTab, setActiveTab] = useState(0);
  const { productId } = useParams();

  const dispatch = useDispatch();
  const product = useSelector((state: any) => state.activeProduct.product);
  const history = useSelector((state: any) => state.activeProduct.history);
  const isLoading = useSelector((state: any) => state.activeProduct.isLoading);

  useEffect(() => {
    const id = parseInt(productId);
    if (!isNaN(id)) {
      dispatch(loadProduct(id));
    }
  }, [dispatch, productId]);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!product) {
    return <Redirect to="/products" />;
  }

  return (
    <>
      <Tabs
        value={activeTab}
        onChange={(event, newValue) => setActiveTab(newValue)}
      >
        <Tab label="Product Details" />
        <Tab label="Price History" />
        <Tab label="Quantity History" />
      </Tabs>
      <div hidden={activeTab !== 0}>
        <ProductDetails product={product} />
      </div>
      <div hidden={activeTab !== 1}>
        <HistoryView
          seriesDescription="Price over time"
          yAxisText="Price"
          product={product}
          history={history.price}
          maxLength={5}
        />
      </div>
      <div hidden={activeTab !== 2}>
        <HistoryView
          seriesDescription="Quantity over time"
          yAxisText="Quantity"
          product={product}
          history={history.quantity}
          maxLength={5}
        />
      </div>
      <Button component={NavLink} to="/products" fullWidth>
        RETURN TO PRODUCTS LIST
      </Button>
    </>
  );
}
