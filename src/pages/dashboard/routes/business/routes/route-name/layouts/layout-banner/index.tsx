import { Skeleton } from '../../../../../../../@common/skeleton';
import { SwiperSliceSelect } from '../swiper-slice-select';
import { SwiperLayout } from '../swipper-layout';
import { LayoutSelectProps } from '../types';
import { getChangedLayout } from '../utils';

import { BannerLayoutType } from 'types/business';

const contentMap: Array<{
  label: React.ReactNode;
  type: BannerLayoutType;
}> = [
  {
    label: 'Estático',
    type: 'static',
  },
  {
    label: 'Deslizable',
    type: 'swipableClassic',
  },
];

export interface LayoutBannerProps extends LayoutSelectProps {}

export const LayoutBanner = ({ value, onChange, ...omittedProps }: LayoutBannerProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ type }) => type === value?.banner?.type)}
      items={contentMap.map(({ label, type }) => {
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.banner?.type === type}
              onSelect={() => onChange?.(getChangedLayout(value, { banner: { type } }))}
            >
              <Skeleton active="banner" layouts={getChangedLayout(value, { banner: { type } })} />
            </SwiperSliceSelect>
          ),
        };
      })}
      {...omittedProps}
    />
  );
};
