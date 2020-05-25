import { all } from "redux-saga/effects";
import watchProductsList from "./productsList";
import watchProductEdit from "./activeProduct";

export default function* rootSaga() {
  yield all([watchProductsList(), watchProductEdit()]);
}
