import { Product } from "../../services/ProductsService";

export enum ActionTypes {
  LOAD_PRODUCTS = "LOAD_PRODUCTS",
  UPDATE_PRODUCT = "UPDATE_PRODUCT",
  SET_PRODUCTS = "SET_PPRODUCTS",
  SET_PRODUCT = "SET_PRODUCT"
}

interface State {
  products: Product[];
  isLoading: boolean;
}

export function loadProducts() {
  return { type: ActionTypes.LOAD_PRODUCTS };
}

export function setProducts(products: Product[]) {
  return { type: ActionTypes.SET_PRODUCTS, products };
}

export function setProduct(product: Product) {
  return { type: ActionTypes.SET_PRODUCT, product };
}

export function updateProduct(product: Product) {
  return { type: ActionTypes.UPDATE_PRODUCT, product };
}

export default function productsList(
  state: State = { products: [], isLoading: false },
  action: any
) {
  switch (action.type) {
    case ActionTypes.SET_PRODUCTS:
      return { ...state, products: action.products, isLoading: false };

    case ActionTypes.SET_PRODUCT:
      return {
        ...state,
        products: state.products.map(entry =>
          action.product.id === entry.id ? action.product : entry
        ),
        isLoading: false
      };

    case ActionTypes.LOAD_PRODUCTS:
      return { ...state, isLoading: true };

    case ActionTypes.UPDATE_PRODUCT:
      return { ...state, isLoading: true };

    default:
      return state;
  }
}
