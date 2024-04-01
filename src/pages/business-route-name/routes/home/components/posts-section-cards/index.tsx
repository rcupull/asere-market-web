import { CardGroup } from 'components/card-group';
import { CardPost } from 'components/card-post';
import { Swiper } from 'components/swiper';

import { Business, PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';
import { Post } from 'types/post';
import { getPostRoute } from 'utils/business';

export interface PostsSectionCardsProps extends StyleProps {
  posts: Array<Post> | null;
  business: Business;
  layout: PostsLayoutSection;
}

export const PostsSectionCards = ({ business, posts, layout }: PostsSectionCardsProps) => {
  const { routeName } = business;
  const { type } = layout;

  if (type === 'oneRowSlider') {
    return (
      <Swiper
        className="!w-[90vw] !sm:w-[80vw]"
        slidesPerView="auto"
        items={posts?.map((post, index) => {
          const { _id } = post;

          return {
            content: (
              <CardPost
                key={index}
                post={post}
                layout={layout.postCardLayout}
                href={getPostRoute({ routeName, postId: _id })}
                // callAfarResources={[callAfarResourcesFetchPosts, callAfarResourcesRefreshBusiness]}
              />
            ),
          };
        })}
      />
    );
  }

  return (
    <CardGroup className="mt-8">
      {posts?.map((post, index) => {
        const { _id } = post;

        return (
          <CardPost
            key={index}
            post={post}
            layout={layout.postCardLayout}
            href={getPostRoute({ routeName, postId: _id })}
            // callAfarResources={[callAfarResourcesFetchPosts, callAfarResourcesRefreshBusiness]}
          />
        );
      })}
    </CardGroup>
  );
};
