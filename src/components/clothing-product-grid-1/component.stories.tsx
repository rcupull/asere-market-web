import { ProductClothingSize1 } from 'components/product-clothing-size-1';
import { ProductColors1 } from 'components/product-colors-1';
import { ProductDescription1 } from 'components/product-description-1';
import { ProductDetails1 } from 'components/product-details-1';
import { ProductHighLights1 } from 'components/product-highlights-1';
import { ProductImages1 } from 'components/product-images-1';
import { ProductPrice1 } from 'components/product-price-1';
import { Review } from 'components/review';

import { ClothingProductGrid1 } from '.';

import { PostClothing } from 'types/post';
import { FormikWrapper } from 'utils/storybook';

export default {
  component: ClothingProductGrid1,
};

const product: PostClothing = {
  name: 'Basic Tee 6-Pack',
  price: 192,
  currency: 'USD',
  _id: '123',
  reviews: {
    average: 4,
    totalCount: 500,
  },
  createdAt: '2021-01-01',
  routeName: 'clothing',
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', bgColor: 'bg-white', selectedRingColor: 'ring-gray-400' },
    { name: 'Gray', bgColor: 'bg-gray-200', selectedRingColor: 'ring-gray-400' },
    { name: 'Black', bgColor: 'bg-gray-900', selectedRingColor: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

export const Default = (): JSX.Element => (
  <FormikWrapper>
    <ClothingProductGrid1
      value={product}
      render={{
        images: ({ images }) => <ProductImages1 value={images} />,
        price: ({ price, currency }) => <ProductPrice1 price={price} currency={currency} />,
        review: ({ reviews }) => <Review value={reviews} />,
        colors: ({ colors }) => <ProductColors1 items={colors} />,
        clothingSize: ({ sizes }) => <ProductClothingSize1 title="Sizes" items={sizes} />,
        description: ({ description }) => <ProductDescription1 value={description} />,
        highLights: ({ highlights }) => (
          <ProductHighLights1 title="Highlights" value={highlights} />
        ),
        details: ({ details }) => <ProductDetails1 title="Details" value={details} />,
      }}
    />
  </FormikWrapper>
);
