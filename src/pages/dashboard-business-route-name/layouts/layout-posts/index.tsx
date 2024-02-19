import { Swiper } from 'components/swiper';

import { Skeleton } from '../../../@common/skeleton';
import { SwiperSliceSelect } from '../SwiperSliceSelect';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { Business } from 'types/business';

export interface LayoutPostsProps {
  business: Business;
}

export const LayoutPosts = ({ business }: LayoutPostsProps) => {
  return (
    <LayoutPageSection>
       <Swiper
        items={[
          {
            content: (
              <SwiperSliceSelect label='Rejilla'>
                <Skeleton
                  banner="static"
                  footer="basic"
                  active="posts"
                  posts="grid"
                  search="wide"
                />
              </SwiperSliceSelect>
            ),
          },
          {
            content: (
              <SwiperSliceSelect label='Horizontal'>
                <Skeleton
                  banner="static"
                  footer="basic"
                  active="posts"
                  posts="slicesHorizontal"
                  search="wide"
                />
              </SwiperSliceSelect>
            ),
          },
          {
            content: (
              <SwiperSliceSelect label='Resumen alternado'>
                <Skeleton
                  banner="static"
                  footer="basic"
                  active="posts"
                  posts="alternateSummary"
                  search="wide"
                />
              </SwiperSliceSelect>
            ),
          },
        ]}
      />
    </LayoutPageSection>
  );
};
