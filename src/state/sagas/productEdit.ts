import { put, takeLatest } from "redux-saga/effects";

import { ActionTypes } from "../reducers/productEdit";
import { ActionTypes as ActionTypesProductsList } from "../reducers/productsList";
import {
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct
} from "../../services/ProductsService";
import { getHistory } from "../../services/HistoryService";

function* getProductTask({ productId }: any) {
  const product = yield getProduct(productId);
  const history = yield getHistory(productId);

  yield put({ type: ActionTypes.SET_PRODUCT, product, history });
}

function* updateProductTask({ product }: any) {
  const updated = yield updateProduct(product);
  const history = yield getHistory(updated.id);

  yield put({ type: ActionTypes.SET_PRODUCT, updated, history });
  yield put({ type: ActionTypesProductsList.LOAD_PRODUCTS });
}

function* createProductTask({ product }: any) {
  const created = yield createProduct(product);

  yield put({ type: ActionTypes.SET_PRODUCT, created });
  yield put({ type: ActionTypesProductsList.LOAD_PRODUCTS });
}

function* deleteProductTask({ product }: any) {
  yield deleteProduct(product.id);

  yield put({ type: ActionTypesProductsList.LOAD_PRODUCTS });
}

export default function* watchProductEdit() {
  yield takeLatest(ActionTypes.LOAD_PRODUCT, getProductTask);
  yield takeLatest(ActionTypes.UPDATE_PRODUCT, updateProductTask);
  yield takeLatest(ActionTypes.CREATE_PRODUCT, createProductTask);
  yield takeLatest(ActionTypes.DELETE_PPRODUCT, deleteProductTask);
}
