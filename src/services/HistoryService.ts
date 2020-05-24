import { Product } from "./ProductsService";

interface HistoryEntry {
  oldValue: number;
  newValue: number;
  time: number;
}

interface ProductHistory {
  productId: number;
  price: HistoryEntry[];
  quantity: HistoryEntry[];
}

function isHistoryEntry(e: any): e is HistoryEntry {
  const entry = e as HistoryEntry;
  return (
    entry.oldValue !== undefined &&
    entry.newValue !== undefined &&
    entry.time !== undefined
  );
}

function isHistory(h: any): h is ProductHistory {
  const history = h as ProductHistory;
  return (
    history.productId !== undefined &&
    history.price instanceof Array &&
    history.quantity instanceof Array &&
    history.price.map(isHistoryEntry).reduce((p, c) => p && c, true)
  );
}

function getAllHistories(): ProductHistory[] {
  const result: ProductHistory[] = [];

  const item = localStorage.getItem("productsHistory");
  if (!item) {
    localStorage.setItem("productsHistory", JSON.stringify(result));
    return result;
  }

  const parsed = JSON.parse(item);
  if (parsed instanceof Array) {
    for (let entry of parsed) {
      if (isHistory(entry)) {
        result.push(entry);
      }
    }
  }

  return result;
}

export function getHistory(productId: number) {
  return getAllHistories().find(history => history.productId === productId);
}

export function createHistory(product: Product) {
  const histories = getAllHistories();

  histories.push({
    productId: product.id,
    price: [
      { newValue: product.price, oldValue: product.price, time: Date.now() }
    ],
    quantity: [
      {
        oldValue: product.quantity,
        newValue: product.quantity,
        time: Date.now()
      }
    ]
  });

  localStorage.setItem("productsHistory", JSON.stringify(histories));
}

export function updateHistory(product: Product) {
  const history = getHistory(product.id);

  if (!history) {
    return;
  }

  const time = Date.now();

  const oldPrice = history.price[history.price.length - 1].newValue;
  const newPrice = product.price;
  if (oldPrice !== newPrice) {
    history.price.push({ newValue: newPrice, oldValue: oldPrice, time });
  }

  const oldQuantity = history.quantity[history.quantity.length - 1].newValue;
  const newQuantity = product.quantity;
  if (oldQuantity !== newQuantity) {
    history.quantity.push({
      newValue: newQuantity,
      oldValue: oldQuantity,
      time
    });
  }

  const allHistories = getAllHistories().map(entry =>
    entry.productId === history.productId ? history : entry
  );
  localStorage.setItem("productsHistory", JSON.stringify(allHistories));
}
