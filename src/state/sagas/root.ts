import { all } from "redux-saga/effects";
import watchProductsList from "./productsList";

export default function* rootSaga() {
  yield all([watchProductsList()]);
}
