import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import { IconButton, IconButtonProps } from 'components/icon-button';

export interface IconButtonViewProps extends IconButtonProps {}

export const IconButtonView = (props: IconButtonViewProps) => (
  <IconButton svg={ArrowTopRightOnSquareIcon} variant="outlined" title="Ver la página" {...props} />
);
