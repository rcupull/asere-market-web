import { SwiperSliceSelect } from '../swiper-slice-select';
import { SwiperLayout } from '../swipper-layout';
import { LayoutSelectProps } from '../types';
import { getChangedLayout } from '../utils';

import { SkeletonPostCard } from 'pages/@common/skeleton-post-card';
import { PostCardLayoutName } from 'types/business';

const contentMap: Array<{
  label: React.ReactNode;
  name: PostCardLayoutName;
}> = [
  {
    label: 'Ninguno',
    name: 'none',
  },
  {
    label: 'Básico',
    name: 'basic',
  },
];

export interface LayoutPostCardNameProps extends LayoutSelectProps {}

export const LayoutPostCardName = ({ onChange, value }: LayoutPostCardNameProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ name }) => name === value?.postCard?.name)}
      items={contentMap.map(({ label, name }) => {
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.postCard?.name === name}
              onSelect={() => onChange?.(getChangedLayout(value, { postCard: { name } }))}
            >
              <SkeletonPostCard
                layouts={getChangedLayout(value, { postCard: { name } })}
              />
            </SwiperSliceSelect>
          ),
        };
      })}
    />
  );
};
