import { Swiper } from 'components/swiper';

import { Skeleton } from '../../@common/skeleton';
import { SwiperSliceSelect } from './SwiperSliceSelect';
import { LayoutSelectProps } from './types';
import { getChangedLayout } from './utils';

export interface LayoutBannerProps extends LayoutSelectProps {}

export const LayoutBanner = ({ value, onChange, ...omittedProps }: LayoutBannerProps) => {
  return (
    <Swiper
      items={[
        {
          content: (
            <SwiperSliceSelect
              label="Estático"
              selected={value?.banner?.type === 'static'}
              onSelect={() => onChange?.(getChangedLayout(value, { banner: { type: 'static' } }))}
            >
              <Skeleton
                active="banner"
                layouts={getChangedLayout(value, { banner: { type: 'static' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Deslizable"
              selected={value?.banner?.type === 'swipableClassic'}
              onSelect={() =>
                onChange?.(getChangedLayout(value, { banner: { type: 'swipableClassic' } }))
              }
            >
              <Skeleton
                active="banner"
                layouts={getChangedLayout(value, { banner: { type: 'swipableClassic' } })}
              />
            </SwiperSliceSelect>
          ),
        },
      ]}
      {...omittedProps}
    />
  );
};
