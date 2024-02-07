import { useEffect, useState } from 'react';

import { Pagination } from 'components/pagination';
import { ProductSimple } from 'components/product-simple';
import { ProductsGroup } from 'components/products-group';

import { usePostsApi } from 'features/post/api';

import { ModulePostsFilter } from './module-posts-filter';

import { StyleProps } from 'types/general';

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

  return (
    <div className={className}>
      <div className="flex">
        <ModulePostsFilter
          className="ml-auto"
          isBusy={postsApi.getAll.status.isBusy}
          onChange={(f) => {
            const newFilters = { ...filters, ...f };
            setFilters(newFilters);
            postsApi.getAll.fetch({ businessIds, filters: newFilters });
          }}
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
        onChange={({ page }) => {
          const newFilters = { ...filters, page };
          setFilters(newFilters);
          postsApi.getAll.fetch({ businessIds, filters: newFilters });
        }}
      />
    </div>
  );
};
