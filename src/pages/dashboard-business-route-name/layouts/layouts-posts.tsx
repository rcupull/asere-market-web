import { Swiper } from 'components/swiper';

import { Skeleton } from '../../@common/skeleton';
import { SwiperSliceSelect } from './SwiperSliceSelect';
import { LayoutSelectProps } from './types';
import { getChangedLayout } from './utils';

export interface LayoutPostsProps extends LayoutSelectProps {}

export const LayoutPosts = ({ onChange, value, ...omittedProps }: LayoutPostsProps) => {
  return (
    <Swiper
      items={[
        {
          content: (
            <SwiperSliceSelect
              label="Rejilla"
              selected={value?.posts?.type === 'grid'}
              onSelect={() => onChange?.(getChangedLayout(value, { posts: { type: 'grid' } }))}
            >
              <Skeleton
                active="posts"
                layouts={getChangedLayout(value, { posts: { type: 'grid' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Horizontal"
              selected={value?.posts?.type === 'slicesHorizontal'}
              onSelect={() =>
                onChange?.(getChangedLayout(value, { posts: { type: 'slicesHorizontal' } }))
              }
            >
              <Skeleton
                active="posts"
                layouts={getChangedLayout(value, { posts: { type: 'slicesHorizontal' } })}
              />
            </SwiperSliceSelect>
          ),
        },
        {
          content: (
            <SwiperSliceSelect
              label="Resumen alternado"
              selected={value?.posts?.type === 'alternateSummary'}
              onSelect={() =>
                onChange?.(getChangedLayout(value, { posts: { type: 'alternateSummary' } }))
              }
            >
              <Skeleton
                active="posts"
                layouts={getChangedLayout(value, { posts: { type: 'alternateSummary' } })}
              />
            </SwiperSliceSelect>
          ),
        },
      ]}
      {...omittedProps}
    />
  );
};
