import { useEffect, useState } from 'react';

import { MutedBox } from 'components/muted-box';
import { Swiper, SwiperProps } from 'components/swiper';

import { cn } from 'utils/general';

export interface SwiperLayoutProps extends SwiperProps {}

export const SwiperLayout = ({ activeIndex, ...props }: SwiperLayoutProps) => {
  const { items } = props;
  const [active, setActive] = useState<number>();

  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 overflow-x-auto max-w-full p-1">
        {items?.map((_, index) => {
          return (
            <MutedBox
              onClick={() => setActive(index)}
              key={index}
              className={cn('h-14 !w-14 cursor-pointer flex-shrink-0', {
                'ring-2 ring-gray-600': active === index,
                'ring-2 !ring-indigo-600': activeIndex === index,
              })}
            />
          );
        })}
      </div>
      <Swiper
        activeIndex={active}
        onSlideChange={({ activeIndex }) => setActive(activeIndex)}
        {...props}
      />
    </div>
  );
};
