import { CardGroup } from 'components/card-group';
import { HeroSectionCentered } from 'components/hero-section-centered';
import { Pagination } from 'components/pagination';
import { ProductSimple } from 'components/product/product-simple';

import { usePostsApi } from 'features/post/api';

import { useFilters } from 'hooks/useFilters';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SearchFilter } from 'pages/@common/search-filter';
import { getImageEndpoint } from 'utils/api';
import { getPostRoute } from 'utils/business';

export const Home = () => {
  const postsApi = usePostsApi().getAll;

  const filters = useFilters<{ search?: string; page?: number }>({
    onChange: (filters) => postsApi.fetch({ filters }),
  });

  return (
    <LayoutPage>
      <HeroSectionCentered />
      <LayoutPageSection>
        <div className="flex justify-end">
          <SearchFilter
            isBusy={postsApi.status.isBusy}
            onChange={(search) => filters.onMergeFilters({ search })}
            value={filters.value.search}
          />
        </div>
        <CardGroup title="Recientes">
          {postsApi.data?.map(({ name, price, currency, routeName, _id, images }, index) => {
            return (
              <ProductSimple
                key={index}
                href={getPostRoute({ routeName, postId: _id })}
                name={name}
                price={`${price} ${currency}`}
                image={images?.[0]}
                getImageUrl={getImageEndpoint}
              />
            );
          })}
        </CardGroup>

        <Pagination
          className="w-full mt-6"
          paginator={postsApi.paginator}
          onChange={({ page }) => filters.onMergeFilters({ page })}
        />
      </LayoutPageSection>
    </LayoutPage>
  );
};
