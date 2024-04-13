import { EmptyImage } from 'components/empty-image';
import { Swiper } from 'components/swiper';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';
import { useBusinessUpdateBanner } from 'pages/@hooks/useBusinessUpdateBanner';
import { StyleProps } from 'types/general';
import { getImageEndpoint } from 'utils/api';
import { cn } from 'utils/general';

export interface BannerProps extends StyleProps {
  routeName: string;
}

export const Banner = ({ routeName, className }: BannerProps) => {
  const businessUpdateBanner = useBusinessUpdateBanner();
  const { business } = useBusinessOwnerData();
  const { bannerImages, layouts } = business || {};

  const bannerLayout = layouts?.banner;

  if (bannerLayout?.type === 'none') {
    return <></>;
  }

  const renderContainer = (content: React.ReactNode) => (
    <UpdateSomethingContainer
      title="Editar el banner"
      onClick={() => businessUpdateBanner.open({ routeName })}
    >
      {content}
    </UpdateSomethingContainer>
  );

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

    return renderContainer(
      renderContent({
        content: (
          <img src={src && getImageEndpoint(src)} className="object-contain w-full h-full" />
        ),
        href,
      }),
    );
  }

  if (bannerLayout?.type === 'swipableClassic') {
    return renderContainer(
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
      ),
    );
  }

  return <></>;
};
