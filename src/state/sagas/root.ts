import { all } from "redux-saga/effects";
import watchProductsList from "./productsList";
import watchProductEdit from "./productEdit";

export default function* rootSaga() {
  yield all([watchProductsList(), watchProductEdit()]);
}
