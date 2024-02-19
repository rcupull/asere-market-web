import { Swiper as SwiperBase, SwiperProps as SwiperPropsBase, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';
interface SwiperItem {
  content: React.ReactNode;
}

export interface SwiperProps extends SwiperPropsBase, StyleProps {
  items?: Array<SwiperItem>;
}
export const Swiper = ({ items, className, ...omittedProps }: SwiperProps) => {
  return (
    <SwiperBase
      modules={[Navigation]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      //   onSlideChange={() => console.log('slide change')}
      //   onSwiper={(swiper) => console.log(swiper)}
      className={cn('w-full', className)}
      {...omittedProps}
    >
      {items?.map(({ content }, index) => {
        return <SwiperSlide key={index}>{content}</SwiperSlide>;
      })}
    </SwiperBase>
  );
};
