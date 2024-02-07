import { PencilSquareIcon } from '@heroicons/react/24/outline';

import { IconButton, IconButtonProps } from 'components/icon-button';

export interface IconButtonUpdateProps extends IconButtonProps {}

export const IconButtonUpdate = (props: IconButtonUpdateProps) => (
  <IconButton svg={PencilSquareIcon} {...props} variant="outlined" />
);
