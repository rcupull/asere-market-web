import { useEffect } from 'react';

import { HeroSectionCentered } from 'components/hero-section-centered';
import { ProductSimple } from 'components/product-simple';
import { ProductsGroup } from 'components/products-group';

import { useFetch } from 'hooks/useFetch';

import { getEndpoint } from 'utils/api';

const productItems = [
  {
    name: 'Earthen Bottle',
    price: '$78',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
  },
  {
    name: 'Nomad Tumbler',
    price: '$129',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
  },
  {
    name: 'Hanging Beste',
    price: '$78',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
  },
];

export const Home = () => {
  const [posts, , handleFetchPosts] = useFetch();

  console.log('posts', posts);
  useEffect(() => {
    handleFetchPosts({
      method: 'get',
      url: getEndpoint({
        path: '/post',
      }),
    });
  }, []);

  return (
    <main>
      <HeroSectionCentered />

      <ProductsGroup title="Recientes">
        {[...productItems, ...productItems, ...productItems].map((item, index) => (
          <ProductSimple
            key={index}
            href="#"
            name={item.name}
            price={item.price}
            imageSrc={item.imageSrc}
          />
        ))}
      </ProductsGroup>
    </main>
  );
};
