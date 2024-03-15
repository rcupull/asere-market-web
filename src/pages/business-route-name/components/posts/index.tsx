import { useRef } from 'react';

import { CardGroup } from 'components/card-group';
import { FilterWrapper } from 'components/filter-wrapper';
import { ProductSimple } from 'components/product/product-simple';

import { useGetAllPosts } from 'features/api/useGetAllPosts';
import { useGetAllUserBusinessRouteNames } from 'features/api/useGetAllUserBusinessRouteNames';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';

import { PaginationProps } from '../pagination';
import { SearchProps } from '../search';

import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { Business } from 'types/business';
import { StyleProps } from 'types/general';
import { getImageEndpoint } from 'utils/api';
import { getPostRoute } from 'utils/business';

export interface PostsProps extends StyleProps {
  business: Business;
  getSearch?: (props: SearchProps) => React.ReactNode;
  getPagination?: (props: PaginationProps) => React.ReactNode;
}

export const Posts = ({ business, className, getSearch, getPagination }: PostsProps) => {
  const { layouts, routeName } = business;

  const postsLayout = layouts?.posts;

  const { isUserOwnerOfRoute } = useGetAllUserBusinessRouteNames();
  const { getAllPosts } = useGetAllPosts();

  const refOnRefresh = useRef<() => void>();
  useCallFromAfar(callAfarIds.business_route_name_refresh_posts, () => {
    refOnRefresh.current?.();
  });

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
              <ProductSimple
                key={index}
                post={post}
                href={getPostRoute({ routeName, postId: _id })}
                getImageUrl={getImageEndpoint}
                enabledUpdate={isUserOwnerOfRoute(routeName)}
                callAfarResources={callAfarIds.business_route_name_refresh_posts}
              />
            );
          })}
        </CardGroup>,
      ),
    );
  }

  return <></>;
};
