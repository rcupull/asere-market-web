import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { IconButton, IconButtonProps } from 'components/icon-button';

import { cn } from 'utils/general';

export interface IconButtonUpdateProps extends IconButtonProps {}

export const IconButtonUpdate = ({ className, ...props }: IconButtonUpdateProps) => (
  <IconButton svg={PencilSquareIcon} {...props} className={cn('text-blue-700', className)} />
);
