import { PostAdded } from './post-added';

import { UserShoppingCartAddedMeta } from 'types/auth';
import { Post } from 'types/post';

export interface ShoppingCartPostsProps {
  value: Array<{
    post: Post;
    meta: UserShoppingCartAddedMeta;
  }>;
}

export const ShoppingCartPosts = ({ value }: ShoppingCartPostsProps) => {
  return (
    <div className="text-center">
      <div className="font-semibold my-2">Productos en tu carro</div>
      <div className="flex flex-col gap-1 mt-3">
        {value.map(({ meta, post }, index) => {
          return <PostAdded key={index} meta={meta} post={post} />;
        })}
      </div>
    </div>
  );
};
