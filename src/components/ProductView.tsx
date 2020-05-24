import React, { useEffect, useState } from "react";
import { makeStyles, Typography, Tabs, Tab } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../state/reducers/productEdit";
import { ProductDetails } from "./ProductDetails";
import { HistoryView } from "./HistoryView";

interface Props {
  productId: number;
}

export function ProductView({ productId }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const dispatch = useDispatch();
  const product = useSelector((state: any) => state.activeProduct.product);
  const history = useSelector((state: any) => state.activeProduct.history);
  const isLoading = useSelector((state: any) => state.activeProduct.isLoading);

  useEffect(() => {
    dispatch(loadProduct(productId));
  }, [dispatch, productId]);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!product) {
    return <div>product does not exist</div>;
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
        <HistoryView product={product} history={history.price} />
      </div>
      <div hidden={activeTab !== 2}>
        <HistoryView product={product} history={history.quantity} />
      </div>
    </>
  );
}
