import { useModal } from "../..";
import { Button } from "../../../../components/button";
import { Modal, ModalProps } from "../../../../components/modal";


export interface ConfirmationProps {
  useProps: () => Partial<ModalProps>;
}

export const Confirmation = ({ useProps }: ConfirmationProps) => {
  const { onClose } = useModal();

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
            alert("Some confirmation message");
          }}
        />
      }
      secondaryBtn={
        <Button label="Cerrar" onClick={() => onClose()} variant="outlined" />
      }
      {...props}
    />
  );
};
