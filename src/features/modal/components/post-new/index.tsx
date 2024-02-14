import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { Modal } from 'components/modal';

import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { FormClothing } from './components/form-clothing';

// import { FormSimple } from './components/form-simple';
import { OnAfterSuccess } from 'types/api';
import { Post } from 'types/post';

export interface PostNewProps {
  onAfterSuccess?: OnAfterSuccess;
  routeName: string;
  post?: Post;
}

export const PostNew = ({ onAfterSuccess, routeName, post }: PostNewProps) => {
  const submitPortal = useSubmitPortal();

  // const newPostForm = (
  //   <FormSimple routeName={routeName} submitPortal={submitPortal} onAfterSuccess={onAfterSuccess} />
  // );

  const newPostForm = (
    <FormClothing
      routeName={routeName}
      submitPortal={submitPortal}
      onAfterSuccess={onAfterSuccess}
      post={post}
    />
  );

  return (
    <Modal
      title="Nueva publicación"
      content={newPostForm}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={submitPortal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
