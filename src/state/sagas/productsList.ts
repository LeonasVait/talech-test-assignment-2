import { takeLatest, put, delay } from "redux-saga/effects";

import { getProducts, updateProduct } from "../../services/ProductsService";
import { setProducts, setProduct } from "../reducers/productsList";

import { ActionTypes } from "../reducers/productsList";

function* getProductsTask() {
  const products = yield getProducts();
  yield delay(1000);
  yield put(setProducts(products));
}

function* updateProductTask({ product }: any) {
  const updated = updateProduct(product);
  yield delay(1000);
  yield put(setProduct(updated));
}

export default function* watchProductsList() {
  yield takeLatest(ActionTypes.LOAD_PRODUCTS, getProductsTask);
  yield takeLatest(ActionTypes.UPDATE_PRODUCT, updateProductTask);
}
