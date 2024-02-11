import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CardGroup } from 'components/card-group';
import { Pagination } from 'components/pagination';
import { ProductSimple } from 'components/product/product-simple';

import { useBusinessApi } from 'features/business/api';
import { usePostsApi } from 'features/post/api';

import { useFilters } from 'hooks/useFilters';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SearchFilter } from 'pages/@common/search-filter';
import { getPostRoute } from 'utils/business';

export const BusinessRouteName = () => {
  const { routeName } = useParams();

  const businessApis = useBusinessApi().getOne;

  const business = businessApis.data;

  const postsApi = usePostsApi().getAll;

  const filters = useFilters<{ search?: string; page?: number }>({
    onChange: (filters) => routeName && postsApi.fetch({ routeNames: [routeName], filters }),
  });

  useEffect(() => {
    if (routeName) {
      businessApis.fetch({ routeName });
    }
  }, []);


  if(!routeName) return <></>
  
  return (
    <LayoutPage title={business?.name} backButton>
      <LayoutPageSection title="Publicaciones">
        <div className="flex justify-end">
          <SearchFilter
            isBusy={postsApi.status.isBusy}
            onChange={(search) => filters.onMergeFilters({ search })}
            value={filters.value.search}
          />
        </div>
        <CardGroup className="mt-2">
          {postsApi.data?.map(({ name, price, currency, _id }, index) => {
            return (
              <ProductSimple
                key={index}
                href={getPostRoute({routeName, postId: _id})}
                name={name}
                price={`${price} ${currency}`}
                //   imageSrc={images?.[0]}
              />
            );
          })}
        </CardGroup>

        <Pagination
          className="mt-2"
          paginator={postsApi?.paginator}
          onChange={({ page }) => filters.onMergeFilters({ page })}
        />
      </LayoutPageSection>
    </LayoutPage>
  );
};
