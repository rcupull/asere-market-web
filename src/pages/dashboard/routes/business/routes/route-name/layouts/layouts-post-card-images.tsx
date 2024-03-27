import { SwiperSliceSelect } from './SwiperSliceSelect';
import { SwiperLayout } from './swipper-layout';
import { LayoutSelectProps } from './types';
import { getChangedLayout } from './utils';

import { SkeletonPostCard } from 'pages/@common/skeleton-post-card';
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

export interface LayoutPostCardImagesProps extends LayoutSelectProps {}

export const LayoutPostCardImages = ({
  onChange,
  value,
}: LayoutPostCardImagesProps) => {
  return (
    <SwiperLayout
      activeIndex={contentMap.findIndex(({ images }) => images === value?.postCard?.images)}
      items={contentMap.map(({ label, images }) => {
 
        return {
          content: (
            <SwiperSliceSelect
              label={label}
              selected={value?.postCard?.images === images}
              onSelect={() => onChange?.(getChangedLayout(value, { postCard: { images } }))}
            >
              <SkeletonPostCard
                active="images"
                layouts={getChangedLayout(value, { postCard: { images } })}
              />
            </SwiperSliceSelect>
          ),
        };
      })}
    />
  );
};
