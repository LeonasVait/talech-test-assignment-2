import { takeLatest, put, delay } from "redux-saga/effects";

import { getProducts } from "../../services/ProductsService";
import { setProducts } from "../reducers/productsList";

import { ActionTypes } from "../reducers/productsList";

function* getProductsTask() {
  const products = yield getProducts();
  yield delay(1000);
  yield put(setProducts(products));
}

export default function* watchProductsList() {
  yield takeLatest(ActionTypes.LOAD_PRODUCTS, getProductsTask);
}
