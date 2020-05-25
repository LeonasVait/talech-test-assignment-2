import { combineReducers } from "redux";
import productsList from "./productsList";
import activeProduct from "./activeProduct";

export default combineReducers({ productsList, activeProduct });
