import { Swiper } from 'components/swiper';

import { Skeleton } from '../../../@common/skeleton';
import { SwiperSliceSelect } from '../SwiperSliceSelect';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { Business } from 'types/business';

export interface LayoutBannerProps {
  business: Business;
}

export const LayoutBanner = ({ business }: LayoutBannerProps) => {
  return (
    <LayoutPageSection>
      <Swiper
        items={[
          {
            content: (
              <SwiperSliceSelect label='Estático'>
                <Skeleton
                  banner="static"
                  footer="basic"
                  active="banner"
                  posts="grid"
                  search="wide"
                />
              </SwiperSliceSelect>
            ),
          },
          {
            content: (
              <SwiperSliceSelect label='Deslizable'>
                <Skeleton
                  banner="swipableClassic"
                  footer="basic"
                  active="banner"
                  posts="grid"
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
