import { useEffect } from 'react';

import { useGetAllPosts } from 'features/api/posts/useGetAllPosts';
import { useAuth } from 'features/api-slices/useAuth';

import { UserShoppingCartAddedMeta } from 'types/auth';
import { Post } from 'types/post';

export const useBusinessShoppingCart = (args?: {
  routeName: string | undefined;
}): {
  data: Array<{
    post: Post;
    meta: UserShoppingCartAddedMeta;
  }>;
  onRefresh: () => void;
  totalCount: number
} => {
  const { routeName } = args || {};

  const { authData, onRefreshAuthUser } = useAuth();

  const { user } = authData || {};

  const postsAdded = user?.shoppingCart?.added?.filter((e) => e.routeName === routeName);

  const { getAllPosts } = useGetAllPosts();


  useEffect(() => {
    if (postsAdded?.length) {
      getAllPosts.fetch({ postsIds: postsAdded.map(({ postId }) => postId) });
    }
  }, [postsAdded?.length]);

  const getData = () => {
    if (!getAllPosts.data) {
      return [];
    }

    if (!postsAdded?.length) {
      return [];
    }

    return postsAdded.map((meta, index) => ({
      meta,
      post: getAllPosts.data[index],
    }));
  };


  const data = getData();


  const totalCount = data?.reduce((acc, { meta }) => {
    const { count } = meta;

    return acc + count;
  }, 0);



  return {
    data,
    onRefresh: onRefreshAuthUser,
    totalCount
  };
};
