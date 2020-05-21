export interface Product {
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
    name: "Packaging tape",
    ean: "7160170846679",
    type: "Packaging equipment",
    weight: 0.1,
    color: "Blue",
    active: true
  },
  {
    name: "Helmet",
    ean: "8419265850572",
    type: "Safety equipment",
    weight: 1,
    color: "Red",
    active: true
  },
  {
    name: "Plastic bag",
    ean: "8252899460607",
    type: "Packaging equipment",
    weight: 0.1,
    color: "Green",
    active: false
  },
  {
    name: "Forklift",
    ean: "1364762400881",
    type: "Warehouse Equipment",
    weight: 800.6,
    color: "Yellow",
    active: false
  },
  {
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
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));
}

export function getProduct(index: number) {
  const products = getProducts();
  if (index >= 0 && index < products.length) {
    return products[index];
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

export function updateProduct(index: number, product: Product) {
  const products = getProducts();

  if (index >= 0 && index < products.length) {
    products[index] = product;
    localStorage.setItem("products", JSON.stringify(products));
  }
}

export function deleteProduct(index: number) {
  const products = getProducts();

  if (index >= 0 && index < products.length) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
  }
}
