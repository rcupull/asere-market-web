import { EmptyImage } from 'components/empty-image';
import { Swiper } from 'components/swiper';

import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { getImageEndpoint } from 'utils/api';
import { cn } from 'utils/general';

export interface BannerProps extends StyleProps {
  business: Business;
}

export const Banner = ({ business, className }: BannerProps) => {
  const { bannerImages, layouts } = business;

  const bannerLayout = layouts?.banner;

  if (bannerLayout?.type === 'none') {
    return <></>;
  }

  const renderContent = (content: React.ReactNode) => {
    return (
      <div className={cn('h-96 flex items-center justify-center', className)}>
        {content || <EmptyImage />}
      </div>
    );
  };

  if (bannerLayout?.type === 'static') {
    const mainImage = bannerImages?.[0];
    const previewSrc = mainImage?.src && getImageEndpoint(mainImage?.src);

    return renderContent(
      previewSrc && <img src={previewSrc} className="object-contain w-full h-full" />,
    );
  }

  if (bannerLayout?.type === 'swipableClassic') {
    return (
      bannerImages?.length && (
        <Swiper
          autoplay={{
            delay: 5000,
          }}
          items={bannerImages?.map(({ src }) => {
            const imageSrc = src && getImageEndpoint(src);

            return {
              content: renderContent(
                <img src={imageSrc} className="object-contain w-full h-full" />,
              ),
            };
          })}
        />
      )
    );
  }

  return <></>;
};
