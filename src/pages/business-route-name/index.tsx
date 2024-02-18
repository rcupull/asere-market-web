import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CardGroup } from 'components/card-group';
import { Divider } from 'components/divider';
import { Pagination } from 'components/pagination';
import { ProductSimple } from 'components/product/product-simple';

import { useGetAllPosts } from 'features/api/useGetAllPosts';
import { useGetAllUserBusinessRouteNames } from 'features/api/useGetAllUserBusinessRouteNames';
import { useGetOneBusiness } from 'features/api/useGetOneBusiness';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useFilters } from 'hooks/useFilters';

import { Banner } from './components/banner';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SearchFilter } from 'pages/@common/search-filter';
import { getImageEndpoint } from 'utils/api';
import { getPostRoute } from 'utils/business';

export const BusinessRouteName = () => {
  const { routeName } = useParams();

  const { getOneBusiness } = useGetOneBusiness();
  const { isUserOwnerOfRoute } = useGetAllUserBusinessRouteNames();

  const { getAllPosts } = useGetAllPosts();

  const filters = useFilters<{ search?: string; page?: number }>({
    onChange: (filters) => routeName && getAllPosts.fetch({ routeNames: [routeName], filters }),
  });

  useCallFromAfar('business_route_name_refresh_posts', () => filters.onRefresh());

  useEffect(() => {
    if (routeName) {
      getOneBusiness.fetch({ routeName });
      return () => {
        getOneBusiness.reset();
      };
    }
  }, []);

  const business = getOneBusiness.data;

  if (!routeName || !business) return <></>;

  return (
    <LayoutPage>
      <Banner business={business} getImageSrc={getImageEndpoint} />

      <Divider />

      <LayoutPageSection title="Publicaciones">
        <div className="flex justify-end">
          <SearchFilter
            isBusy={getAllPosts.status.isBusy}
            onChange={(search) => filters.onMergeFilters({ search })}
            value={filters.value.search}
          />
        </div>
        <CardGroup className="mt-2">
          {getAllPosts.data?.map((post, index) => {
            const { _id } = post;

            return (
              <ProductSimple
                key={index}
                post={post}
                href={getPostRoute({ routeName, postId: _id })}
                getImageUrl={getImageEndpoint}
                enabledUpdate={isUserOwnerOfRoute(routeName)}
                callAfarResources="business_route_name_refresh_posts"
              />
            );
          })}
        </CardGroup>

        <Pagination
          className="mt-2"
          paginator={getAllPosts?.paginator}
          onChange={({ page }) => filters.onMergeFilters({ page })}
        />
      </LayoutPageSection>
    </LayoutPage>
  );
};
