export interface Product {
  id: number;
  name: string;
  ean: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
}

export function isProduct(p: any): p is Product {
  const product = p as Product;
  return (
    product.id !== undefined &&
    product.name !== undefined &&
    product.ean !== undefined &&
    product.type !== undefined &&
    product.weight !== undefined &&
    product.color !== undefined &&
    product.active !== undefined
  );
}

const initialData: any = [
  {
    id: 1,
    name: "Packaging tape",
    ean: "7160170846679",
    type: "Packaging equipment",
    weight: 0.1,
    color: "Blue",
    active: true
  },
  {
    id: 2,
    name: "Helmet",
    ean: "8419265850572",
    type: "Safety equipment",
    weight: 1,
    color: "Red",
    active: true
  },
  {
    id: 3,
    name: "Plastic bag",
    ean: "8252899460607",
    type: "Packaging equipment",
    weight: 0.1,
    color: "Green",
    active: false
  },
  {
    id: 4,
    name: "Forklift",
    ean: "1364762400881",
    type: "Warehouse Equipment",
    weight: 800.6,
    color: "Yellow",
    active: false
  },
  {
    id: 5,
    name: "Box",
    ean: "9960606993919",
    type: "Packaging equipment",
    weight: 0.1,
    //color: "Gray",
    active: false
  }
];

export function createProduct(product: Product) {
  const products = getProducts();
  product.id = products
    .map(({ id }) => id + 1)
    .reduce((p, c) => (c > p ? c : p));

  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}

export function getProduct(id: number) {
  for (let product of getProducts()) {
    if (product.id === id) {
      return product;
    }
  }
}

export function getProducts(): Product[] {
  const item = localStorage.getItem("products");

  if (!item) {
    localStorage.setItem("products", JSON.stringify(initialData));
    return getProducts();
  }

  const parsed = JSON.parse(item);
  const result: Product[] = [];

  if (parsed instanceof Array) {
    for (let entry of parsed) {
      if (isProduct(entry)) {
        result.push(entry);
      }
    }
  }

  return result;
}

export function updateProduct(product: Product) {
  const products = getProducts().map(entry =>
    entry.id === product.id ? product : entry
  );

  localStorage.setItem("products", JSON.stringify(products));
  return product;
}

export function deleteProduct(productId: number) {
  const products = getProducts().filter(({ id }) => id !== productId);

  localStorage.setItem("products", JSON.stringify(products));
}
