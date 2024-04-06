import { PostCardSize } from 'types/business';
import { cn } from 'utils/general';

export const getCardPostSizes = ({ size }: { size: PostCardSize | undefined }) => {
  return cn({
    'sm:w-[12rem] h-[15rem]': size === 'small',
    'sm:w-[16rem] h-[20rem]': size === 'medium',
    'sm:w-[20rem] h-[24rem]': size === 'long',
  });
};

export const getCardPostImageSizes = ({
  rounded,
  size,
}: {
  size: PostCardSize | undefined;
  rounded: boolean;
}) => {
  if (rounded) {
    return cn({
      'sm:w-[11.5rem] h-[10rem]': size === 'small',
      'sm:w-[15.5rem] h-[14rem]': size === 'medium',
      'sm:w-[19.5rem] h-[19rem]': size === 'long',
    });
  }

  return cn({
    'sm:w-[11.5rem] h-[12rem]': size === 'small',
    'sm:w-[15.5rem] h-[15rem]': size === 'medium',
    'sm:w-[19.5rem] h-[20rem]': size === 'long',
  });
};
