import { EmptyImage } from 'components/empty-image';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface BannerProps extends StyleProps {
  business: Business;
  getImageSrc?: (src: string) => string;
}

export const Banner = ({ business, getImageSrc, className }: BannerProps) => {
  const { bannerImages } = business;
  const mainImage = bannerImages?.[0];

  const previewImage = mainImage?.src && (getImageSrc?.(mainImage?.src) || mainImage?.src);

  return (
    <div className={cn('h-96', className)}>
      {previewImage ? (
        <img src={previewImage} className="object-contain w-full h-full" />
      ) : (
        <EmptyImage />
      )}
    </div>
  );
};
