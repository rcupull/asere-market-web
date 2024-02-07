import { Button } from 'components/button';
import { ButtonClose } from 'components/button-close';
import { Modal, ModalProps } from 'components/modal';

export interface ConfirmationProps {
  useProps: () => Partial<ModalProps>;
}

export const Confirmation = ({ useProps }: ConfirmationProps) => {
  const props = useProps();

  return (
    <Modal
      title="Confirmación"
      content="<Mensaje de confirmación>"
      primaryBtn={
        <Button
          label="Confirmar"
          variant="primary"
          onClick={() => {
            alert('Some confirmation message');
          }}
        />
      }
      secondaryBtn={<ButtonClose />}
      {...props}
    />
  );
};
