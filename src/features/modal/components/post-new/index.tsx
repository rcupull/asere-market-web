import { useEffect } from 'react';

import { Badge } from 'components/badge';
import { ButtonClose } from 'components/button-close';
import { Modal } from 'components/modal';
import { SpinnerEllipsis } from 'components/spinner-ellipsis';

import { useGetOnePost } from 'features/api/posts/useGetOnePost';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { usePortal } from 'hooks/usePortal';

import { PostForm, PostFormProps } from './PostForm';

import { useBusiness } from 'pages/@hooks/useBusiness';

export interface PostNewProps {
  routeName?: string;
  postId?: string; //only user to update a post
  callAfarResources?: CallAfarResources;
}

export const PostNew = ({ routeName: routeNameProp, postId, callAfarResources }: PostNewProps) => {
  const portal = usePortal();
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
  const { getOnePost } = useGetOnePost();
  const businessOwnerData = useBusiness();

  const post = getOnePost.data;
  const business = businessOwnerData.business;

  useEffect(() => {
    if (postId) {
      return getOnePost.fetch(
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
    if (getOnePost.status.isBusy) {
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
      portal,
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
      primaryBtn={<div ref={portal.ref} />}
      secondaryBtn={<ButtonClose />}
    />
  );
};
