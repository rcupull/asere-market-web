import { ProductClothingSize1 } from '.';

export default {
  component: ProductClothingSize1,
};

export const Default = (): JSX.Element => (
  <ProductClothingSize1
    items={[
      { name: 'XXS', inStock: false },
      { name: 'XS', inStock: true },
      { name: 'S', inStock: true },
      { name: 'M', inStock: false },
      { name: 'L', inStock: true },
      { name: 'XL', inStock: true },
      { name: '2XL', inStock: true },
      { name: '3XL', inStock: true },
    ]}
  />
);
