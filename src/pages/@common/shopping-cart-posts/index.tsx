import { PostAdded } from './post-added';

import { Sale } from 'types/sales';

export interface ShoppingCartPostsProps {
  value: Sale;
}

export const ShoppingCartPosts = ({ value }: ShoppingCartPostsProps) => {
  return (
    <div className="flex flex-col gap-1 mt-3">
      {value.posts.map(({ count, post }, index) => {
        return <PostAdded key={index} count={count} post={post} />;
      })}
    </div>
  );
};
