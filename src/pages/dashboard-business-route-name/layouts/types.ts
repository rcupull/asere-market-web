import { SwiperProps } from 'components/swiper';

import { BusinessLayout } from 'types/business';

export interface LayoutSelectProps extends Omit<SwiperProps, 'onChange'> {
  value?: BusinessLayout;
  onChange?: (value: BusinessLayout) => void;
}
