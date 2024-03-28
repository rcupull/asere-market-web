import { CardPost } from 'components/card-post';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';

const imagesSrcs = [
  'https://i.etsystatic.com/22218968/r/il/b43c35/4139110628/il_570xN.4139110628_l9ye.jpg',
  'https://m.media-amazon.com/images/I/61qxynwQyzL.jpg',
  'https://image.made-in-china.com/202f0j00TEwkYheJhbzH/Black-Shoes-for-Ladies-High-Quality-Handmade-Wholesale-Shoes-Women.webp',
  'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/de2b9e4db6b27e94b7dab5c7509fc1b8.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp',
  'https://c8.alamy.com/compes/2ay61fg/zapatos-negros-para-mujer-tacon-alto-sobre-fondo-blanco-2ay61fg.jpg',
];

export interface SkeletonPostCardProps extends StyleProps {
  layouts?: Business['layouts'];
}

export const SkeletonPostCard = ({ layouts }: SkeletonPostCardProps) => {
  const { postCard } = layouts || {};

  return (
    <div className="flex justify-center">
      <CardPost
        href="/"
        layout={postCard}
        post={{
          name: 'Zapatos de mujer',
          images: imagesSrcs.map((src) => ({
            src,
            width: 300,
            height: 300,
          })),
          description: 'Zapatos de mujer de excelente calidad',
          _id: '_id',
          createdAt: new Date().toISOString(),
          currency: 'CUP',
          price: 256.789,
          discount: 10,
          routeName: 'routeName',
        }}
      />
    </div>
  );
};