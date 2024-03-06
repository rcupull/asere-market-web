import { PlusCircleIcon } from '@heroicons/react/24/outline';

import { IconButton, IconButtonProps } from 'components/icon-button';

export interface IconButtonAddProps extends IconButtonProps {}

export const IconButtonAdd = (props: IconButtonAddProps) => (
  <IconButton svg={PlusCircleIcon} title="Nuevo" {...props} />
);
