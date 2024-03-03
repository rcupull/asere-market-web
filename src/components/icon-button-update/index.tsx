import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { IconButton, IconButtonProps } from 'components/icon-button';

import { cn } from 'utils/general';

export interface IconButtonUpdateProps extends IconButtonProps {}

export const IconButtonUpdate = ({ className, ...props }: IconButtonUpdateProps) => (
  <IconButton
    svg={PencilSquareIcon}
    {...props}
    variant="outlined"
    className={cn('text-indigo-500', className)}
  />
);
