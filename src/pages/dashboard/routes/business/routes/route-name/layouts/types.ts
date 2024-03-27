import { SwiperProps } from 'components/swiper';

import { BusinessLayouts } from 'types/business';

export interface LayoutSelectProps extends Omit<SwiperProps, 'onChange'> {
  value?: BusinessLayouts;
  onChange?: (value: BusinessLayouts) => void;
}
