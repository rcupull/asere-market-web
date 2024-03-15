import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { Modal } from 'components/modal';

import { useGetOneUserBusiness } from 'features/api/useGetOneUserBusiness';
import { useGetOneUserPost } from 'features/api/useGetOneUserPost';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { FormClothing } from './components/form-clothing';
import { FormSimple } from './components/form-simple';

export interface PostNewProps {
  routeName?: string;
  postId?: string; //only user to update a post
  callAfarResources?: CallAfarResources;
}

export const PostNew = ({ routeName: routeNameProp, postId, callAfarResources }: PostNewProps) => {
  const submitPortal = useSubmitPortal();

  const { onCallAfar } = useCallFromAfar();
  const onRefresh = () => onCallAfar(callAfarResources);

  /**
   *
   */
  const { getOneUserPost } = useGetOneUserPost();
  const { getOneUserBusiness } = useGetOneUserBusiness();

  const post = getOneUserPost.data;
  const business = getOneUserBusiness.data;

  useEffect(() => {
    if (postId) {
      getOneUserPost.fetch({ id: postId });
    }
  }, [postId]);

  /**
   *
   */
  const routeName = routeNameProp || post?.routeName;
  const businessCategory = business?.category;

  useEffect(() => {
    if (routeName) {
      getOneUserBusiness.fetch({ routeName });
    }
  }, [routeName]);

  if (!routeName) {
    return <></>;
  }

  const getForm = () => {
    if (businessCategory === 'clothing') {
      return (
        <FormClothing
          routeName={routeName}
          submitPortal={submitPortal}
          onAfterSuccess={onRefresh}
          post={post}
        />
      );
    }

    return (
      <FormSimple
        routeName={routeName}
        submitPortal={submitPortal}
        onAfterSuccess={onRefresh}
        post={post}
      />
    );
  };

  return (
    <Modal
      title={postId ? 'Editar publicación' : 'Nueva publicación'}
      content={getForm()}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={submitPortal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
