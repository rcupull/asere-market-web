import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CardGroup } from 'components/card-group';
import { Pagination } from 'components/pagination';
import { ProductSimple } from 'components/product-simple';

import { useBusinessApi } from 'features/business/api';
import { usePostsApi } from 'features/post/api';

import { useFilters } from 'hooks/useFilters';

import { LayoutPage } from 'pages/@common/layout-page';
import { SearchFilter } from 'pages/@common/search-filter';
import { AnyRecord } from 'types/general';

export const BusinessRouteName = () => {
  const { routeName } = useParams();

  const businessApis = useBusinessApi();
  const postsApi = usePostsApi();

  const business = businessApis.getOne.data;


  const onFetchPosts = (routeName: string, filters?: AnyRecord) => postsApi.getAll.fetch({ routeNames: [routeName], filters });

  useEffect(() => {
    if (routeName) {
      businessApis.getOne.fetch({ routeName });
      onFetchPosts(routeName);
    }
  }, [routeName]);


  const filters = useFilters({
    onChange: (filters) => routeName && onFetchPosts(routeName, filters),
  });

  if (!business) return <></>;

  return (
    <LayoutPage title={business.name} backButton>

      <div>
        <div className="flex justify-end">
          <SearchFilter
            isBusy={postsApi.getAll.status.isBusy}
            onChange={(search) => filters.onMergeFilters({ search })}
          />
        </div>
        <CardGroup className='mt-2'>
          {postsApi.getAll.data?.map(({ name, price, currency, _id}, index) => {
            return (
              <ProductSimple
                key={index}
                href={`/${routeName}/${_id}`}
                name={name}
                price={`${price} ${currency}`}
                //   imageSrc={images?.[0]}
              />
            );
          })}
        </CardGroup>

        <Pagination
        className='mt-2'
          paginator={postsApi.getAll?.paginator}
          onChange={({ page }) => filters.onMergeFilters({ page })}
        />
      </div>
    </LayoutPage>
  );
};
