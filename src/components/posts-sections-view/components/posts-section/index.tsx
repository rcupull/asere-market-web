import { useEffect } from 'react';

import { useGetAllPosts } from 'features/api/useGetAllPosts';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useFilters } from 'hooks/useFilters';

import { PostsSectionCards } from '../posts-section-cards';
import { PostsSectionSearch } from '../posts-section-search';

import { UpdateSomethingContainer } from 'pages/@common/update-something-container';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { GetAllPostsQuery } from 'types/api';
import { Business, PostsLayoutSection, PostsLayoutSectionVisibility } from 'types/business';
import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface PostsSectionProps extends StyleProps {
  index: number;
  business: Business;
  onRefresh: () => void;
  layout: PostsLayoutSection;
  visibility: PostsLayoutSectionVisibility;
}

export const PostsSection = ({
  business,
  onRefresh,
  layout,
  className,
  index,
  visibility,
}: PostsSectionProps) => {
  const { routeName } = business;
  const { name, hiddenName, postCategoriesTags, _id, showIn } = layout;

  const { pushModal } = useModal();
  const { getAllPosts } = useGetAllPosts();
  const { owner } = useBusinessPageData();

  const hidden = !showIn?.includes(visibility);
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
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold">{name}</h2>
            {renderHiddenSection && (
              <span className="text-sm sm:text-lg ml-3 text-yellow-600">
                (Solo visible para el administrador del negocio)
              </span>
            )}
          </div>
        )}

        <PostsSectionSearch layout={layout} filters={filters} business={business} />

        <PostsSectionCards layout={layout} posts={getAllPosts.data} business={business} />
      </div>
    </UpdateSomethingContainer>
  );
};
