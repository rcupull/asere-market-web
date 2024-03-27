import { SwiperSliceSelect } from '../swiper-slice-select';
import { SwiperLayout } from '../swipper-layout';
import { LayoutSelectProps } from '../types';
import { getChangedLayout } from '../utils';

import { SkeletonPostCard } from 'pages/@common/skeleton-post-card';
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

export interface LayoutPostCardDiscountProps extends LayoutSelectProps {}

export const LayoutPostCardDiscount = ({ onChange, value }: LayoutPostCardDiscountProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ discount }) => discount === value?.postCard?.discount)}
      items={contentMap.map(({ label, discount }) => {
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.postCard?.discount === discount}
              onSelect={() => onChange?.(getChangedLayout(value, { postCard: { discount } }))}
            >
              <SkeletonPostCard layouts={getChangedLayout(value, { postCard: { discount } })} />
            </SwiperSliceSelect>
          ),
        };
      })}
    />
  );
};
