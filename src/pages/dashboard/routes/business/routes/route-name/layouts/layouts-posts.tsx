import { Skeleton } from '../../../../../../@common/skeleton';
import { SwiperSliceSelect } from './SwiperSliceSelect';
import { SwiperLayout } from './swipper-layout';
import { LayoutSelectProps } from './types';
import { getChangedLayout } from './utils';

import { PostsLayoutType } from 'types/business';

const contentMap: Array<{
  label: React.ReactNode;
  type: PostsLayoutType;
}> = [
  {
    label: 'Rejilla',
    type: 'grid',
  },
  // {
  //   label: 'Horizontal',
  //   type: 'slicesHorizontal',
  // },
  // {
  //   label: 'Resumen alternado',
  //   type: 'alternateSummary',
  // },
];

export interface LayoutPostsProps extends LayoutSelectProps {}

export const LayoutPosts = ({ onChange, value, ...omittedProps }: LayoutPostsProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ type }) => type === value?.posts?.type)}
      items={contentMap.map(({ label, type }) => {
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.posts?.type === type}
              onSelect={() => onChange?.(getChangedLayout(value, { posts: { type } }))}
            >
              <Skeleton active="posts" layouts={getChangedLayout(value, { posts: { type } })} />
            </SwiperSliceSelect>
          ),
        };
      })}
      {...omittedProps}
    />
  );
};
