import { useEffect } from 'react';

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
          onChange={(filters) => postsApi.getAll.fetch({ businessIds, filters })}
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
    </div>
  );
};
