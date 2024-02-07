import { Button, ButtonProps } from 'components/button';

import { useModal } from 'features/modal';

export interface ButtonCloseProps extends ButtonProps {}

export const ButtonClose = (props: ButtonCloseProps) => {
  const { onClose } = useModal();

  return <Button label="Cerrar" onClick={() => onClose()} {...props} variant="outlined" />;
};
