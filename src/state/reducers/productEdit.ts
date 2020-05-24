import { Product } from "../../services/ProductsService";
import { ProductHistory } from "../../services/HistoryService";

export enum ActionTypes {
  LOAD_PRODUCT = "EDIT_LOAD_PRODUCTS",
  UPDATE_PRODUCT = "EDIT_UPDATE_PRODUCT",
  CREATE_PRODUCT = "EDIT_SET_PPRODUCT",
  SET_PRODUCT = "EDIT_SET_PRODUCT",
  DELETE_PPRODUCT = "EDIT_DELETE_PPRODUCT"
}

interface State {
  product?: Product;
  history?: ProductHistory;
  isLoading: boolean;
}

export function loadProduct(productId: number) {
  return { type: ActionTypes.LOAD_PRODUCT, productId };
}

export function setProduct(product: Product, history: ProductHistory) {
  return { type: ActionTypes.SET_PRODUCT, product, history };
}

export function updateProduct(product: Product) {
  return { type: ActionTypes.UPDATE_PRODUCT, product };
}

export function createProduct(product: Product) {
  return { type: ActionTypes.CREATE_PRODUCT, product };
}

export function deleteProduct(product: Product) {
  return { type: ActionTypes.DELETE_PPRODUCT, product };
}

export default function activeProduct(
  state: State = { isLoading: false },
  action: any
) {
  switch (action.type) {
    case ActionTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.product,
        history: action.history,
        isLoading: false
      };

    case ActionTypes.LOAD_PRODUCT:
    case ActionTypes.DELETE_PPRODUCT:
      return {
        ...state,
        product: undefined,
        history: undefined,
        isLoading: true
      };

    case ActionTypes.UPDATE_PRODUCT:
      return { ...state, isLoading: true };

    case ActionTypes.CREATE_PRODUCT:
      return { ...state, isLoading: true };

    default:
      return state;
  }
}
