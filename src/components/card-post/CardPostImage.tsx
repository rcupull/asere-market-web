import { useEffect, useState } from 'react';

import { EmptyImage } from 'components/empty-image';
import { Swiper } from 'components/swiper';
import { ZoomUpContainer } from 'components/zoom-up-container';

import { useInterval } from 'hooks/useInterval';

import { PostCardLayout } from 'types/business';
import { Image } from 'types/general';
import { Post } from 'types/post';
import { getImageEndpoint } from 'utils/api';

export interface CardPostImageProps {
  post: Post;
  layout?: PostCardLayout;
}

export const CardPostImage = ({ post, layout }: CardPostImageProps) => {
  const imageLayout = layout?.images;
  const images = post.images;

  const [switchImage, setSwitchImage] = useState<Image>();
  const interval = useInterval();

  useEffect(() => {
    if (imageLayout === 'switch' && images?.length) {
      if (images.length === 1) {
        return setSwitchImage(images[0]);
      }

      interval(
        images.map((image) => () => setSwitchImage(image)),
        1000,
      );

      return interval.cancel;
    }
  }, [imageLayout]);

  const renderImage = ({ src, alt }: Image) => (
    <img src={getImageEndpoint(src)} alt={alt} className="object-contain group-hover:opacity-75" />
  );

  const renderContent = () => {
    if (!images?.length) {
      return (
        <div className="flex items-center justify-center h-64 w-64">
          <EmptyImage className="h-32 w-32" />
        </div>
      );
    }

    if (imageLayout === 'static') {
      return renderImage(images[0]);
    }

    if (imageLayout === 'hoverZoom') {
      return <ZoomUpContainer>{renderImage(images[0])}</ZoomUpContainer>;
    }

    if (imageLayout === 'slider') {
      return (
        <Swiper
          autoplay={{
            delay: 1000,
          }}
          navigation={false}
          items={images.map((image) => ({
            content: renderImage(image),
          }))}
        />
      );
    }

    if (imageLayout === 'switch' && switchImage) {
      return renderImage(switchImage);
    }
  };

  return (
    <div className="border border-gray-300 overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center h-80 w-full sm:max-w-72">
      {renderContent()}
    </div>
  );
};