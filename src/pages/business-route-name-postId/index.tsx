import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ClothingProductGrid1 } from 'components/clothing-product-grid-1';

import { usePostsApi } from 'features/post/api';

import { LayoutPage } from 'pages/@common/layout-page';

export const BusinessRouteNamePostId = () => {
  const { postId } = useParams();

  const postApi = usePostsApi();

  useEffect(() => {
    if (postId) {
      postApi.getOne.fetch({ id: postId });
    }
  }, [postId]);

  const post = postApi.getOne.data;

  return (
    <LayoutPage title={post?.name} backButton>
     <ClothingProductGrid1  />
    </LayoutPage>
  );
};
