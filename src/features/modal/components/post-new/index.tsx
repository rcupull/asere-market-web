import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { Modal } from 'components/modal';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

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
            businessOwnerData.onFetch({ routeName });
          },
        },
      );
    }

    if (routeNameProp) {
      businessOwnerData.onFetch({ routeName: routeNameProp });
    }
  }, []);

  /**
   *
   */
  const routeName = routeNameProp || post?.routeName;

  const getContent = () => {
    if (getOneUserPost.status.isBusy) {
      return (
        <div className="h-40 flex justify-center items-center">
          <SpinnerEllipsis />
        </div>
      );
    }

    if (!routeName || !business) {
      return <></>;
    }

    const businessCategory = business.category;

    const commonProps: PostFormProps = {
      routeName,
      //
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
            'postPageLayout',
          ]}
          validations={[
            {
              field: 'name',
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
            field: 'name',
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
