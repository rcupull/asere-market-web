import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { Modal } from 'components/modal';

import { useGetOneUserPost } from 'features/api/useGetOneUserPost';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { FormClothing } from './components/form-clothing';

export interface PostNewProps {
  routeName?: string;
  postId?: string; //only user to update a post
  updateId?: string;
}

export const PostNew = ({ routeName: routeNameProp, postId, updateId }: PostNewProps) => {
  const submitPortal = useSubmitPortal();

  const { pushId } = useCallFromAfar();
  const onRefresh = () => pushId(updateId);

  /**
   *
   */
  const { getOneUserPost } = useGetOneUserPost();

  const post = getOneUserPost.data;
  useEffect(() => {
    if (postId) {
      getOneUserPost.fetch({ id: postId });
    }
  }, [postId]);

  /**
   *
   */
  const routeName = routeNameProp || post?.routeName;

  if (!routeName) {
    return <></>;
  }

  // const newPostForm = (
  //   <FormSimple routeName={routeName} submitPortal={submitPortal} onAfterSuccess={onAfterSuccess} />
  // );

  const newPostForm = (
    <FormClothing
      routeName={routeName}
      submitPortal={submitPortal}
      onAfterSuccess={onRefresh}
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
