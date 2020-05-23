import { put, delay, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "../reducers/productEdit";
import { ActionTypes as ActionTypesProductsList } from "../reducers/productsList";
import {
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct
} from "../../services/ProductsService";

function* getProductTask({ productId }: any) {
  const product = yield getProduct(productId);
  yield delay(1000);
  yield put({ type: ActionTypes.SET_PRODUCT, product });
}

function* updateProductTask({ product }: any) {
  const updated = yield updateProduct(product);
  yield delay(1000);
  yield put({ type: ActionTypes.SET_PRODUCT, updated });
  yield put({ type: ActionTypesProductsList.LOAD_PRODUCTS });
}

function* createProductTask({ product }: any) {
  const created = yield createProduct(product);
  yield delay(1000);
  yield put({ type: ActionTypes.SET_PRODUCT, created });
  yield put({ type: ActionTypesProductsList.LOAD_PRODUCTS });
}

function* deleteProductTask({ product }: any) {
  yield deleteProduct(product.id);
  yield delay(1000);
  yield put({ type: ActionTypesProductsList.LOAD_PRODUCTS });
}

export default function* watchProductEdit() {
  yield takeLatest(ActionTypes.LOAD_PRODUCT, getProductTask);
  yield takeLatest(ActionTypes.UPDATE_PRODUCT, updateProductTask);
  yield takeLatest(ActionTypes.CREATE_PRODUCT, createProductTask);
  yield takeLatest(ActionTypes.DELETE_PPRODUCT, deleteProductTask);
}
