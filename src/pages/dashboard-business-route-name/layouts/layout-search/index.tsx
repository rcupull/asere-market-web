import { Swiper } from 'components/swiper';

import { Skeleton } from '../../../@common/skeleton';
import { SwiperSliceSelect } from '../SwiperSliceSelect';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { Business } from 'types/business';

export interface LayoutSearchProps {
  business: Business;
}

export const LayoutSearch = ({ business }: LayoutSearchProps) => {
  return (
    <LayoutPageSection>
      <Swiper
        items={[
          {
            content: (
              <SwiperSliceSelect label='Todo el ancho'>
                <Skeleton
                  banner="static"
                  footer="basic"
                  active="search"
                  posts="grid"
                  search="wide"
                />
              </SwiperSliceSelect>
            ),
          },
          {
            content: (
              <SwiperSliceSelect label='Con botones'>
                <Skeleton
                  banner="static"
                  footer="basic"
                  active="search"
                  posts="grid"
                  search="withButtons"
                />
              </SwiperSliceSelect>
            ),
          },
        ]}
      />
    </LayoutPageSection>
  );
};
