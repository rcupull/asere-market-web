import { useEffect, useState } from 'react';

import { Pagination } from 'components/pagination';
import { ProductSimple } from 'components/product-simple';
import { ProductsGroup } from 'components/products-group';

import { usePostsApi } from 'features/post/api';

import { SearchFilter } from './search-filter';

import { AnyRecord, StyleProps } from 'types/general';

export interface ModulePostsProps extends StyleProps {
  businessIds?: Array<string>;
  title?: string;
}

export const ModulePosts = ({ businessIds, title, className }: ModulePostsProps) => {
  const [filters, setFilters] = useState({});

  const postsApi = usePostsApi();

  useEffect(() => {
    postsApi.getAll.fetch({ businessIds });
  }, []);

  const handleChangeFilters = (partialFilter: AnyRecord) => {
    const newFilters = { ...filters, ...partialFilter };
    setFilters(newFilters);
    postsApi.getAll.fetch({ filters: newFilters });
  };

  return (
    <div className={className}>
      <div className="flex">
        <SearchFilter
          className="ml-auto"
          isBusy={postsApi.getAll.status.isBusy}
          onChange={(search) => handleChangeFilters({ search })}
        />
      </div>
      <ProductsGroup title={title}>
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
      </ProductsGroup>

      <Pagination
        className="w-full mt-6"
        paginator={postsApi.getAll?.paginator}
        onChange={({ page }) => handleChangeFilters({ page })}
      />
    </div>
  );
};
