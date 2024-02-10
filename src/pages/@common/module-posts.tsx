import { useEffect } from 'react';

import { CardGroup } from 'components/card-group';
import { Pagination } from 'components/pagination';
import { ProductSimple } from 'components/product-simple';

import { usePostsApi } from 'features/post/api';

import { useFilters } from 'hooks/useFilters';

import { SearchFilter } from './search-filter';

import {  StyleProps } from 'types/general';

export interface ModulePostsProps extends StyleProps {
  routeNames?: Array<string>;
  title?: string;
}

export const ModulePosts = ({ routeNames, title, className }: ModulePostsProps) => {


  const postsApi = usePostsApi();

  useEffect(() => {
    postsApi.getAll.fetch({ routeNames });
  }, []);

  
  const filters = useFilters({
    onChange: (filters)=> postsApi.getAll.fetch({ filters })
  });


  return (
    <div className={className}>
      <div className="flex justify-end">
        <SearchFilter
          isBusy={postsApi.getAll.status.isBusy}
          onChange={(search) => filters.onMergeFilters({ search })}
        />
      </div>
      <CardGroup title={title}>
        {postsApi.getAll.data?.map(({ name, price, currency }, index) => {
          return (
            <ProductSimple
              key={index}
              href="#"
              name={name}
              price={`${price} ${currency}`}
              //   imageSrc={images?.[0]}
            />
          );
        })}
      </CardGroup>

      <Pagination
        className="w-full mt-6"
        paginator={postsApi.getAll?.paginator}
        onChange={({ page }) => filters.onMergeFilters({ page })}
      />
    </div>
  );
};
