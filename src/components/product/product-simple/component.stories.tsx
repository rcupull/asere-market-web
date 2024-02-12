import { ProductSimple } from '.';

export default {
  component: ProductSimple,
};

export const Default = (): JSX.Element => (
  <ProductSimple
    image={{
      src: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    }}
    href="#"
    name="Earthen Bottle"
    price="$78"
  />
);
