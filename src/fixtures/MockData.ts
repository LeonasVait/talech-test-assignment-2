export interface Product {
  name: string;
  ean: string;
  type: string;
  weight: number;
  color: string;
  active: boolean;
}

export const data: Product[] = [
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
    color: "Gray",
    active: false
  }
];
