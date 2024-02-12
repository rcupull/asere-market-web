import { CameraIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

import { PostImage } from 'types/post';
import { cn } from 'utils/general';
export interface Props {
  className?: string;
  href: string;
  image?: PostImage;
  name: string;
  price: string;
  getImageUrl?: (src: string) => string;
}

export const ProductSimple = ({ className, image, href, name, price, getImageUrl }: Props) => {
  return (
    <Link data-id="ProductSimple" className={cn('group', className)} to={href}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 flex items-center justify-center">
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
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>
    </Link>
  );
};
