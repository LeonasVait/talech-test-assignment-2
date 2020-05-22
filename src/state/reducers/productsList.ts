import { Product } from "../../services/ProductsService";

export enum ActionTypes {
  LOAD_PRODUCTS = "LOAD_PRODUCTS",
  SET_PPRODUCTS = "SET_PPRODUCTS"
}

interface State {
  products: Product[];
  isLoading: boolean;
}

export function loadProducts() {
  return { type: ActionTypes.LOAD_PRODUCTS };
}

export function setProducts(products: Product[]) {
  return { type: ActionTypes.SET_PPRODUCTS, products };
}

export default function productsList(
  state: State = { products: [], isLoading: false },
  action: any
) {
  switch (action.type) {
    case ActionTypes.SET_PPRODUCTS:
      return { products: action.products, isLoading: false };

    case ActionTypes.LOAD_PRODUCTS:
      return { ...state, isLoading: true };

    default:
      return state;
  }
}
