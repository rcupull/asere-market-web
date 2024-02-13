import { CardGroup } from 'components/card-group';
import { HeroSectionCentered } from 'components/hero-section-centered';
import { Pagination } from 'components/pagination';
import { ProductSimple } from 'components/product/product-simple';

import { useGetAllPosts } from 'features/api/useGetAllPosts';

import { useFilters } from 'hooks/useFilters';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SearchFilter } from 'pages/@common/search-filter';
import { getImageEndpoint } from 'utils/api';
import { getPostRoute } from 'utils/business';

export const Home = () => {
  const { getAllPosts } = useGetAllPosts();

  const filters = useFilters<{ search?: string; page?: number }>({
    onChange: (filters) => getAllPosts.fetch({ filters }),
  });

  return (
    <LayoutPage>
      <HeroSectionCentered />
      <LayoutPageSection>
        <div className="flex justify-end">
          <SearchFilter
            isBusy={getAllPosts.status.isBusy}
            onChange={(search) => filters.onMergeFilters({ search })}
            value={filters.value.search}
          />
        </div>
        <CardGroup title="Recientes">
          {getAllPosts.data?.map((post, index) => {
            const { routeName, _id } = post;

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
          className="w-full mt-6"
          paginator={getAllPosts.paginator}
          onChange={({ page }) => filters.onMergeFilters({ page })}
        />
      </LayoutPageSection>
    </LayoutPage>
  );
};
