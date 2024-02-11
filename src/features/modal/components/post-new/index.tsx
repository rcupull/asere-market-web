import { ButtonClose } from 'components/button-close';
import { Modal } from 'components/modal';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { FormSimple } from './components/form-simple';

import { OnAfterSuccess } from 'types/api';

export interface PostNewProps {
  onAfterSuccess?: OnAfterSuccess;
  routeName: string;
}

export const PostNew = ({ onAfterSuccess, routeName }: PostNewProps) => {
  const submitPortal = useSubmitPortal();

  const newPostForm = (
    <FormSimple routeName={routeName} submitPortal={submitPortal} onAfterSuccess={onAfterSuccess} />
  );

  return (
    <Modal
      title="Nueva publicación"
      content={newPostForm}
      primaryBtn={<div ref={submitPortal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
