import { PencilIcon } from '@heroicons/react/24/outline';

import { IconButton, IconButtonProps } from 'components/icon-button';

import { cn } from 'utils/general';

export interface IconButtonUpdateProps extends IconButtonProps {}

export const IconButtonUpdate = ({ className, ...props }: IconButtonUpdateProps) => (
  <IconButton
    svg={PencilIcon}
    {...props}
    variant="outlined"
    className={cn('text-yellow-700', className)}
  />
);
