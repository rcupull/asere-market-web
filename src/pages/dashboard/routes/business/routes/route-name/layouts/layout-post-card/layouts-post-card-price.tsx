import { SwiperSliceSelect } from '../swiper-slice-select';
import { SwiperLayout } from '../swipper-layout';
import { LayoutSelectProps } from '../types';
import { getChangedLayout } from '../utils';

import { SkeletonPostCard } from 'pages/@common/skeleton-post-card';
import {  PostCardLayoutPrice } from 'types/business';

const contentMap: Array<{
  label: React.ReactNode;
  price: PostCardLayoutPrice;
}> = [
  {
    label: 'Ninguno',
    price: 'none',
  },
  {
    label: 'Básico',
    price: 'basic',
  },
  {
    label: 'Moneda reducida',
    price: 'smallerCurrency',
  },
  {
    label: 'Con símbolo de USD',
    price: 'usdCurrencySymbol',
  },
];

export interface LayoutPostCardPriceProps extends LayoutSelectProps {}

export const LayoutPostCardPrice = ({ onChange, value }: LayoutPostCardPriceProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ price }) => price === value?.postCard?.price)}
      items={contentMap.map(({ label, price }) => {
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.postCard?.price === price}
              onSelect={() => onChange?.(getChangedLayout(value, { postCard: { price } }))}
            >
              <SkeletonPostCard
                layouts={getChangedLayout(value, { postCard: { price } })}
              />
            </SwiperSliceSelect>
          ),
        };
      })}
    />
  );
};
