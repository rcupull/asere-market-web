import { createContext, useContext, useState } from 'react';

import { BusinessNew } from './components/business-new';
import { Confirmation } from './components/confirmation';
import { PostNew } from './components/post-new';
import { ModalId, ModalWindowProps } from './types';

import { AnyRecord } from 'types/general';

type ModalProps = AnyRecord;

type PushModal = <Id extends ModalId>(id: Id, props: ModalWindowProps<Id>) => void;

interface ModalData {
  modalId?: ModalId;
  modalProps?: ModalProps;
}

interface ModalState {
  pushModal: PushModal;
  onClose: () => void;
}

const ModalContext = createContext<ModalState>({
  pushModal: () => {},
  onClose: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalData, setModalData] = useState<Array<ModalData>>([]);

  const render = (modalId: ModalId, Component: any): React.ReactNode => {
    const index = modalData.findIndex((m) => m.modalId === modalId);
    if (index < 0) return null;
    const props = modalData[index].modalProps || {};
    return <Component {...props} />;
  };

  const pushModal: PushModal = (modalId, modalProps) => {
    setModalData((current) => [
      ...current,
      {
        modalId,
        modalProps,
      },
    ]);
  };

  const value: ModalState = {
    pushModal,
    onClose: () => {
      setModalData((current) => {
        return current.length === 0 ? [] : current.slice(0, -1);
      });
    },
  };

  return (
    <ModalContext.Provider value={value}>
      {render('PostNew', PostNew)}
      {render('BusinessNew', BusinessNew)}
      {render('Confirmation', Confirmation)}
      {children}
    </ModalContext.Provider>
  );
};
