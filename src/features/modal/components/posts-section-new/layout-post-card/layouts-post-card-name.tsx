import { DummyPostCard } from './dummy-post-card';
import { SwiperSliceSelect } from './swiper-slice-select';
import { SwiperLayout } from './swipper-layout';
import { CommonProps } from './type';
import { getChangedPostCardLayout } from './utils';

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

export interface LayoutPostCardNameProps extends CommonProps {}

export const LayoutPostCardName = ({ onChange, value }: LayoutPostCardNameProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ name }) => name === value?.name)}
      items={contentMap.map(({ label, name }) => {
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.name === name}
              onSelect={() => onChange?.(getChangedPostCardLayout(value, { name }))}
            >
              <DummyPostCard postCardLayout={getChangedPostCardLayout(value, { name })} />
            </SwiperSliceSelect>
          ),
        };
      })}
    />
  );
};
