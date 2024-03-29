import { CommonProps } from '../type';
import { getChangedPostCardLayout } from '../utils';
import { DummyPostCard } from './dummy-post-card';
import { SwiperSliceSelect } from './swiper-slice-select';
import { SwiperLayout } from './swipper-layout';

import { PostCardLayoutImages } from 'types/business';

const contentMap: Array<{
  label: React.ReactNode;
  images: PostCardLayoutImages;
}> = [
  {
    label: 'Estática',
    images: 'static',
  },
  {
    label: 'Zoom',
    images: 'hoverZoom',
  },
  {
    label: 'Carrousel',
    images: 'slider',
  },
  {
    label: 'Alternado',
    images: 'switch',
  },
];

export interface LayoutPostCardImagesProps extends CommonProps {}

export const LayoutPostCardImages = ({ onChange, value }: LayoutPostCardImagesProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ images }) => images === value?.images)}
      items={contentMap.map(({ label, images }) => {
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.images === images}
              onSelect={() => onChange?.(getChangedPostCardLayout(value, { images }))}
            >
              <DummyPostCard postCardLayout={getChangedPostCardLayout(value, { images })} />
            </SwiperSliceSelect>
          ),
        };
      })}
    />
  );
};
