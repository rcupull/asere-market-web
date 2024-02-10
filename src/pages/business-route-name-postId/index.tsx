import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProductSimple } from 'components/product-simple';

import { usePostsApi } from 'features/post/api';

import { LayoutSingle } from 'pages/@common/layout-single';

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
    <LayoutSingle title={post?.name} backButton>
      {'<Improve>'}
      {post && <ProductSimple name={post.name} price={`${post.price} ${post.currency}`} href="#" />}
    </LayoutSingle>
  );
};
