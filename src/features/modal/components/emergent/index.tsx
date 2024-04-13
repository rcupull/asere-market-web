import { Modal, ModalProps } from 'components/modal';

export interface EmergentProps {
  useProps: () => Partial<ModalProps>;
}

export const Emergent = ({ useProps }: EmergentProps) => {
  const props = useProps();

  return <Modal title="<Some title>" content="<Some message>" {...props} />;
};
