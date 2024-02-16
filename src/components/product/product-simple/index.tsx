import { CameraIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { IconButtonUpdate } from 'components/icon-button-update';

import { useModal } from 'features/modal/useModal';

import { Post } from 'types/post';
import { cn } from 'utils/general';
export interface Props {
  className?: string;
  post: Post;
  href: string;
  enabledUpdate?: boolean;
  getImageUrl?: (src: string) => string;
  updateIds?: Array<string>;
}

export const ProductSimple = ({
  className,
  post,
  getImageUrl,
  href,
  enabledUpdate,
  updateIds,
}: Props) => {
  const { price, name, images, currency } = post;

  const image = images?.[0];

  const { pushModal } = useModal();

  return (
    <Link data-id="ProductSimple" className={cn('group', className)} to={href}>
      <div className="border border-gray-300 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 flex items-center justify-center max-w-96 max-h-96">
        {image ? (
          <img
            src={getImageUrl?.(image.src) || image.src}
            alt={image.alt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        ) : (
          <div className="flex items-center justify-center h-64 w-64">
            <CameraIcon className="h-32 w-32 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{`${price} ${currency}`}</p>
        </div>

        {enabledUpdate && (
          <IconButtonUpdate
            onClick={(e) => {
              e.preventDefault();
              pushModal('PostNew', { postId: post._id, updateIds });
            }}
          />
        )}
      </div>
    </Link>
  );
};
