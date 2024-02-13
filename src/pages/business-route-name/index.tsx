import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CardGroup } from 'components/card-group';
import { Pagination } from 'components/pagination';
import { ProductSimple } from 'components/product/product-simple';

import { useGetBusinessOne } from 'features/api/useGetBusinessOne';
import { usePostsApi } from 'features/api/usePostsApi';

import { useFilters } from 'hooks/useFilters';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SearchFilter } from 'pages/@common/search-filter';
import { getImageEndpoint } from 'utils/api';
import { getPostRoute } from 'utils/business';

export const BusinessRouteName = () => {
  const { routeName } = useParams();

  const {getBusinessOne} = useGetBusinessOne();

  const business = getBusinessOne.data;

  const { getAllPosts } = usePostsApi();

  const filters = useFilters<{ search?: string; page?: number }>({
    onChange: (filters) => routeName && getAllPosts.fetch({ routeNames: [routeName], filters }),
  });

  useEffect(() => {
    if (routeName) {
      getBusinessOne.fetch({ routeName });
    }
  }, []);

  if (!routeName) return <></>;

  return (
    <LayoutPage title={business?.name} backButton>
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
            const { _id } = post

            return (
              <ProductSimple
              key={index}
              post={post}
              href={getPostRoute({ routeName, postId: _id })}
              getImageUrl={getImageEndpoint}
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
