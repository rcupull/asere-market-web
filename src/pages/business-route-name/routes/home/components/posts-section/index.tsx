import { CardGroup } from 'components/card-group';
import { CardPost } from 'components/card-post';

import { GetAllPostsQuery, useGetAllPosts } from 'features/api/useGetAllPosts';

import { useFilters } from 'hooks/useFilters';

import { PostsSectionSearch } from '../posts-section-search';

import { Business, PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';
import { getPostRoute } from 'utils/business';
import { cn } from 'utils/general';

export interface PostsSectionProps extends StyleProps {
  index: number;
  business: Business;
  layout: PostsLayoutSection;
}

export const PostsSection = ({ business, layout, className, index }: PostsSectionProps) => {
  const { routeName } = business;
  const { name, showName, postCategoriesTags } = layout;

  const { getAllPosts } = useGetAllPosts();

  const filters = useFilters<GetAllPostsQuery>({
    filterField: `postsSection${index}`,
    onChange: (filters) => {
      const hasCategoriesTags = filters.postCategoriesTags?.length;

      getAllPosts.fetch({
        routeNames: [routeName],
        postCategoriesTags,
        ...filters,
        postCategoriesMethod: hasCategoriesTags ? 'every' : 'some',
      });
    },
  });

  return (
    <div className={cn('mt-10', className)}>
      {showName && (
        <div className="flex justify-center">
          <h2 className="text-2xl">{name}</h2>
        </div>
      )}

      <PostsSectionSearch layout={layout} filters={filters} business={business} />

      <CardGroup className="mt-8">
        {getAllPosts.data?.map((post, index) => {
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
    </div>
  );
};
