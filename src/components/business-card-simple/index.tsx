import { CameraIcon } from '@heroicons/react/24/outline';

import { BusinessCategory } from 'types/business';
import { getBusinessCategoryLabel } from 'utils/business';
import { cn } from 'utils/general';
export interface BusinessCardSimpleProps {
  className?: string;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  category: BusinessCategory;
  name: string;
}

export const BusinessCardSimple = ({ className, imageSrc, imageAlt, href, name, category }: BusinessCardSimpleProps) => {
  return (
    <a data-id="ProductSimple" className={cn('group', className)} href={href}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        ) : (
          <div className="flex items-center justify-center h-64 w-64">
            <CameraIcon className="h-32 w-32 text-gray-400" />
          </div>
        )}
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
      <h3 className="mt-4 text-sm text-gray-700">{getBusinessCategoryLabel(category)}</h3>
    </a>
  );
};
