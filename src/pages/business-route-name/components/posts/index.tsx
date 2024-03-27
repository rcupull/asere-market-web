import { useRef } from 'react';

import { CardGroup } from 'components/card-group';
import { CardPost } from 'components/card-post';
import { FilterWrapper } from 'components/filter-wrapper';

import { useGetAllPosts } from 'features/api/useGetAllPosts';

import { useCallFromAfar } from 'hooks/useCallFromAfar';

import { PaginationProps } from '../pagination';
import { SearchProps } from '../search';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { useBusinessPageData } from 'pages/@hooks/useBusinessPageData';
import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { getPostRoute } from 'utils/business';

export interface PostsProps extends StyleProps {
  business: Business;
  getSearch?: (props: SearchProps) => React.ReactNode;
  getPagination?: (props: PaginationProps) => React.ReactNode;
}

export const Posts = ({ business, className, getSearch, getPagination }: PostsProps) => {
  const { layouts, routeName } = business;

  const postsLayout = layouts?.posts;

  const { getAllPosts } = useGetAllPosts();
  const businessPageData = useBusinessPageData();

  const refOnRefresh = useRef<() => void>();

  const callAfarResourcesFetchPosts = 'src/pages/business-route-name/components/posts__fetch_posts';
  useCallFromAfar(callAfarResourcesFetchPosts, () => {
    refOnRefresh.current?.();
  });

  const callAfarResourcesRefreshBusiness = 'src/pages/business-route-name/components/posts__refreshBusiness';
  useCallFromAfar(callAfarResourcesRefreshBusiness, () => businessPageData.onRefresh({ routeName }));

  if (postsLayout?.type === 'none') {
    return <></>;
  }

  const renderContainer = (content: React.ReactNode) => {
    return (
      <LayoutPageSection title="Publicaciones" className={className}>
        {content}
      </LayoutPageSection>
    );
  };

  const renderFilterWrapper = (content: React.ReactNode) => {
    return (
      <FilterWrapper<{ search?: string; page?: number }>
        onChange={(filters) => routeName && getAllPosts.fetch({ routeNames: [routeName], filters })}
      >
        {(filters) => {
          refOnRefresh.current = filters.onRefresh;

          return (
            <>
              {getSearch?.({ business, filters, isBusy: getAllPosts.status.isBusy })}
              {content}
              {getPagination?.({ filters, paginator: getAllPosts?.paginator })}
            </>
          );
        }}
      </FilterWrapper>
    );
  };

  if (postsLayout?.type === 'grid') {
    return renderContainer(
      renderFilterWrapper(
        <CardGroup className="mt-8">
          {getAllPosts.data?.map((post, index) => {
            const { _id } = post;

            return (
              <CardPost
                key={index}
                post={post}
                layout={business.layouts?.postCard}
                href={getPostRoute({ routeName, postId: _id })}
                callAfarResources={[callAfarResourcesFetchPosts, callAfarResourcesRefreshBusiness]}
              />
            );
          })}
        </CardGroup>,
      ),
    );
  }

  return <></>;
};
