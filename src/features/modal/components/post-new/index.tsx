import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { Modal } from 'components/modal';

import { useGetOneUserPost } from 'features/api/useGetOneUserPost';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useSubmitPortal } from 'hooks/useSubmitPortal';

import { PostForm, PostFormProps } from './PostForm';

import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';

export interface PostNewProps {
  routeName?: string;
  postId?: string; //only user to update a post
  callAfarResources?: CallAfarResources;
}

export const PostNew = ({ routeName: routeNameProp, postId, callAfarResources }: PostNewProps) => {
  const submitPortal = useSubmitPortal();
  const { onClose } = useModal();

  const { onCallAfar } = useCallFromAfar();
  const onRefresh = () => onCallAfar(callAfarResources);

  const onAfterSuccess = () => {
    onRefresh();
    onClose();
  };

  /**
   *
   */
  const { getOneUserPost } = useGetOneUserPost();
  const businessOwnerData = useBusinessOwnerData();

  const post = getOneUserPost.data;
  const business = businessOwnerData.data;

  useEffect(() => {
    if (postId) {
      return getOneUserPost.fetch(
        { id: postId },
        {
          onAfterSuccess: ({ routeName }) => {
            businessOwnerData.onRefresh({ routeName });
          },
        },
      );
    }

    if (routeNameProp) {
      businessOwnerData.onRefresh({ routeName: routeNameProp });
    }
  }, []);

  /**
   *
   */
  const routeName = routeNameProp || post?.routeName;

  if (!routeName || !business) {
    return <></>;
  }

  const businessCategory = business.category;

  const getContent = () => {
    const commonProps: PostFormProps = {
      routeName,
      submitPortal,
      onAfterSuccess,
      post,
      render: [],
      validations: [],
    };

    if (businessCategory === 'clothing') {
      return (
        <PostForm
          {...commonProps}
          render={[
            'name',
            'description',
            'price',
            'currency',
            'clothingSizes',
            'colors',
            'details',
            'postCategoriesTags',
            'images',
            'discount',
            'postsSectionsBelowIds',
          ]}
          validations={[
            {
              field: 'description',
              type: 'required',
            },
            {
              field: 'name',
              type: 'required',
            },
            {
              field: 'currency',
              type: 'required',
            },
            {
              field: 'price',
              type: 'required',
            },
          ]}
        />
      );
    }

    return (
      <PostForm
        {...commonProps}
        render={['name', 'description', 'price', 'currency', 'details', 'images']}
        validations={[
          {
            field: 'description',
            type: 'required',
          },
          {
            field: 'name',
            type: 'required',
          },
          {
            field: 'currency',
            type: 'required',
          },
          {
            field: 'price',
            type: 'required',
          },
        ]}
      />
    );
  };

  return (
    <Modal
      title={postId ? 'Editar publicación' : 'Nueva publicación'}
      content={getContent()}
      badge={<Badge variant="info" />}
      primaryBtn={<div ref={submitPortal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
