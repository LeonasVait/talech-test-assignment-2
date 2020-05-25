import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { Tabs, Tab } from "@material-ui/core";

import { loadProduct } from "../state/reducers/activeProduct";
import { ProductDetails } from "./ProductDetails";
import { HistoryView } from "./HistoryView";
import { AppHeader } from "./AppHeader";

export function ProductView() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state: any) => state.activeProduct.product);
  const history = useSelector((state: any) => state.activeProduct.history);
  const isLoading = useSelector((state: any) => state.activeProduct.isLoading);

  const [activeTab, setActiveTab] = useState(0);

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
      <AppHeader toListButton>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
        >
          <Tab label="Product Details" />
          <Tab label="Price History" />
          <Tab label="Quantity History" />
        </Tabs>
      </AppHeader>

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
    </>
  );
}
