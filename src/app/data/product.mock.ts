import { faker } from '@faker-js/faker';

import { Product } from '../models/product.model';


export const generateProduct = (): Product => {
  return <Product>{
    id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: {
      id: faker.datatype.number(),
      name: faker.commerce.department(),
    },
    images: [
      faker.image.imageUrl(),
      faker.image.imageUrl(),
    ]
  };
}


export const generateProducts = (limit = 7): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < limit; i++)
    products.push(generateProduct());
  return [...products];
}
