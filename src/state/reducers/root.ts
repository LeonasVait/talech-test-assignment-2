import { combineReducers } from "redux";
import productsList from "./productsList";
import activeProduct from "./productEdit";

export default combineReducers({ productsList, activeProduct });
