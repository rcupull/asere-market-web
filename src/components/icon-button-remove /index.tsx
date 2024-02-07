import { XCircleIcon } from '@heroicons/react/24/outline';

import { IconButton, IconButtonProps } from 'components/icon-button';

export interface IconButtonRemoveProps extends IconButtonProps {}

export const IconButtonRemove = (props: IconButtonRemoveProps) => (
  <IconButton svg={XCircleIcon} {...props} variant="error" />
);
