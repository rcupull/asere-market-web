import { useEffect } from 'react';

import { CardGroup } from 'components/card-group';
import { CardPost } from 'components/card-post';

import { GetAllPostsQuery, useGetAllPosts } from 'features/api/useGetAllPosts';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useFilters } from 'hooks/useFilters';

import { PostsSectionSearch } from '../posts-section-search';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { Business, PostsLayoutSection } from 'types/business';
import { StyleProps } from 'types/general';
import { getPostRoute } from 'utils/business';
import { cn } from 'utils/general';

export interface PostsSectionProps extends StyleProps {
  index: number;
  business: Business;
  onRefresh: () => void;
  layout: PostsLayoutSection;
}

export const PostsSection = ({
  business,
  onRefresh,
  layout,
  className,
  index,
}: PostsSectionProps) => {
  const { routeName } = business;
  const { name, hiddenName, postCategoriesTags, _id, hidden } = layout;

  const { pushModal } = useModal();
  const { getAllPosts } = useGetAllPosts();
  const { owner } = useBusinessPageData();

  const notRender = hidden && !owner;
  const renderHiddenSection = hidden && owner;

  const handleFilter = (filters: GetAllPostsQuery) => {
    const hasCategoriesTags = filters.postCategoriesTags?.length;

    getAllPosts.fetch({
      routeNames: [routeName],
      postCategoriesTags,
      ...filters,
      postCategoriesMethod: hasCategoriesTags ? 'every' : 'some',
    });
  };

  const filters = useFilters<GetAllPostsQuery>({
    notCallChangeWhenMount: true,
    filterField: `postsSection${index}`,
    onChange: (filters) => handleFilter(filters),
  });

  useEffect(() => {
    if (notRender) return;

    handleFilter(filters.value);
  }, [JSON.stringify(postCategoriesTags)]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const postSectionRefechId = `post_section_${index}_onRefresh`;
  useCallFromAfar(postSectionRefechId, onRefresh);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (notRender) {
    return <></>;
  }

  return (
    <UpdateSomethingContainer
      onClick={() =>
        pushModal('PostsSectionNew', {
          sectionId: _id,
          routeName,
          callAfarResources: postSectionRefechId,
        })
      }
    >
      <div
        className={cn(
          'mt-10 p-4',
          {
            'bg-gray-200 rounded-md': renderHiddenSection,
          },
          className,
        )}
      >
        {!hiddenName && (
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold">{name}</h2>
            {renderHiddenSection && <span className="text-lg ml-3">(Sección oculta)</span>}
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
    </UpdateSomethingContainer>
  );
};
