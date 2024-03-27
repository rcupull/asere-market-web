import { useEffect, useState } from 'react';

import { MutedBox } from 'components/muted-box';
import { Swiper } from 'components/swiper';
import { ZoomUpContainer } from 'components/zoom-up-container';

import { useInterval } from 'hooks/useInterval';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

const imagesSrcs = [
  'https://i.etsystatic.com/22218968/r/il/b43c35/4139110628/il_570xN.4139110628_l9ye.jpg',
  'https://m.media-amazon.com/images/I/61qxynwQyzL.jpg',
  'https://image.made-in-china.com/202f0j00TEwkYheJhbzH/Black-Shoes-for-Ladies-High-Quality-Handmade-Wholesale-Shoes-Women.webp',
  'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/de2b9e4db6b27e94b7dab5c7509fc1b8.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp',
  'https://c8.alamy.com/compes/2ay61fg/zapatos-negros-para-mujer-tacon-alto-sobre-fondo-blanco-2ay61fg.jpg',
];

export interface SkeletonPostCardProps extends StyleProps {
  layouts?: Business['layouts'];
  active?: 'images';
}

export const SkeletonPostCard = ({ active, className, layouts }: SkeletonPostCardProps) => {
  const { postCard } = layouts || {};
  const [switchIndex, setSwithcIndex] = useState(0);
  const interval = useInterval();

  const images = postCard?.images;

  useEffect(() => {
    if (images === 'switch') {
      return interval(
        [
          () => setSwithcIndex(1),
          () => setSwithcIndex(2),
          () => setSwithcIndex(3),
          () => setSwithcIndex(4),
          () => setSwithcIndex(0),
        ],
        700,
      );
    }

    return interval.cancel;
  }, [images]);

  const renderImages = () => {
    const withMutedBox = (content: React.ReactNode) => (
      <MutedBox className="!w-full sm:!w-60 !h-64 flex items-center" active={active === 'images'}>
        {content}
      </MutedBox>
    );

    if (postCard?.images === 'static') {
      return withMutedBox(<img src={imagesSrcs[0]} />);
    }

    if (postCard?.images === 'hoverZoom') {
      return withMutedBox(
        <ZoomUpContainer>
          <img src={imagesSrcs[0]} />
        </ZoomUpContainer>,
      );
    }

    if (postCard?.images === 'slider') {
      return withMutedBox(
        <Swiper
          autoplay={{
            delay: 1000,
          }}
          navigation={false}
          items={imagesSrcs.map((src) => ({
            content: <img src={src} />,
          }))}
        />,
      );
    }

    if (postCard?.images === 'switch') {
      return withMutedBox(<img src={imagesSrcs[switchIndex]} />);
    }

    return null;
  };

  return (
    <div className={cn('flex justify-center', className)}>
      <div>
        {renderImages()}

        <div className="flex items-center justify-between">
          <div>
            <h3 className="mt-4 text-sm text-gray-700">Zapatos de Mujer</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">1500 CUP</p>
          </div>
        </div>
      </div>
    </div>
  );
};
