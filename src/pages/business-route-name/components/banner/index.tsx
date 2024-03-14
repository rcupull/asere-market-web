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

  const renderContent = (args: { content?: React.ReactNode; href?: string }) => {
    const { content, href } = args;

    if (href) {
      return (
        <a
          href={href}
          className={cn('h-96 flex items-center justify-center', className)}
          target="_blank"
          rel="noreferrer"
        >
          {content || <EmptyImage />}
        </a>
      );
    }

    return (
      <div className={cn('h-96 flex items-center justify-center', className)}>
        {content || <EmptyImage />}
      </div>
    );
  };

  if (bannerLayout?.type === 'static') {
    const { src, href } = bannerImages?.[0] || {};

    return renderContent({
      content: <img src={src && getImageEndpoint(src)} className="object-contain w-full h-full" />,
      href,
    });
  }

  if (bannerLayout?.type === 'swipableClassic') {
    return (
      bannerImages?.length && (
        <Swiper
          autoplay={{
            delay: 5000,
          }}
          items={bannerImages?.map(({ src, href }) => {
            return {
              content: renderContent({
                content: (
                  <img
                    src={src && getImageEndpoint(src)}
                    className="object-contain w-full h-full"
                  />
                ),
                href,
              }),
            };
          })}
        />
      )
    );
  }

  return <></>;
};
