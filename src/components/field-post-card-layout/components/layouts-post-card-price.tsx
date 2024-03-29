import { CommonProps } from '../type';
import { getChangedPostCardLayout } from '../utils';
import { DummyPostCard } from './dummy-post-card';
import { SwiperSliceSelect } from './swiper-slice-select';
import { SwiperLayout } from './swipper-layout';

import { PostCardLayoutPrice } from 'types/business';

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

export interface LayoutPostCardPriceProps extends CommonProps {}

export const LayoutPostCardPrice = ({ onChange, value }: LayoutPostCardPriceProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ price }) => price === value?.price)}
      items={contentMap.map(({ label, price }) => {
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.price === price}
              onSelect={() => onChange?.(getChangedPostCardLayout(value, { price }))}
            >
              <DummyPostCard postCardLayout={getChangedPostCardLayout(value, { price })} />
            </SwiperSliceSelect>
          ),
        };
      })}
    />
  );
};
