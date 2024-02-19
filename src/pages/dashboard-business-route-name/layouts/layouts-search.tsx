import { Swiper } from 'components/swiper';

import { Skeleton } from '../../@common/skeleton';
import { SwiperSliceSelect } from './SwiperSliceSelect';
import { LayoutSelectProps } from './types';
import { getChangedLayout } from './utils';

export interface LayoutSearchProps extends LayoutSelectProps {}

export const LayoutSearch = ({ onChange, value, ...omittedProps }: LayoutSearchProps) => {
  return (
    <Swiper
      items={[
        {
          content: (
            <SwiperSliceSelect
              label="Todo el ancho"
              selected={value?.search?.type === 'wide'}
              onSelect={() => onChange?.(getChangedLayout(value, { search: { type: 'wide' } }))}
            >
              <Skeleton
                active="search"
                layouts={getChangedLayout(value, { search: { type: 'wide' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Con botones"
              selected={value?.search?.type === 'withButtons'}
              onSelect={() =>
                onChange?.(getChangedLayout(value, { search: { type: 'withButtons' } }))
              }
            >
              <Skeleton
                active="search"
                layouts={getChangedLayout(value, { search: { type: 'withButtons' } })}
              />
            </SwiperSliceSelect>
          ),
        },
      ]}
      {...omittedProps}
    />
  );
};
