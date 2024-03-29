import { CommonProps } from '../type';
import { getChangedPostCardLayout } from '../utils';
import { DummyPostCard } from './dummy-post-card';
import { SwiperSliceSelect } from './swiper-slice-select';
import { SwiperLayout } from './swipper-layout';

import { PostCardLayoutDiscount } from 'types/business';

const contentMap: Array<{
  label: React.ReactNode;
  discount: PostCardLayoutDiscount;
}> = [
  {
    label: 'Ninguno',
    discount: 'none',
  },
  {
    label: 'Dinero ahorrado',
    discount: 'savedMoney',
  },
  {
    label: 'Porciento ahorrado',
    discount: 'savedPercent',
  },
];

export interface LayoutPostCardDiscountProps extends CommonProps {}

export const LayoutPostCardDiscount = ({ onChange, value }: LayoutPostCardDiscountProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ discount }) => discount === value?.discount)}
      items={contentMap.map(({ label, discount }) => {
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.discount === discount}
              onSelect={() => onChange?.(getChangedPostCardLayout(value, { discount }))}
            >
              <DummyPostCard postCardLayout={getChangedPostCardLayout(value, { discount })} />
            </SwiperSliceSelect>
          ),
        };
      })}
    />
  );
};
