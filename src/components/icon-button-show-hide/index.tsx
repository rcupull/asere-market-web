import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import { IconButton, IconButtonProps } from 'components/icon-button';

export interface IconButtonShowHideProps extends IconButtonProps {
  hidden?: boolean;
}

export const IconButtonShowHide = ({ hidden, ...props }: IconButtonShowHideProps) => {
  const icon = hidden ? EyeSlashIcon : EyeIcon;
  const title = hidden ? 'Mostrar' : 'Ocultar';

  return <IconButton svg={icon} title={title} {...props} />;
};
