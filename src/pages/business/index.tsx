import { BusinessCardSimple } from 'components/business-card-simple';
import { CardGroup } from 'components/card-group';
import { Pagination } from 'components/pagination';

import { useBusinessApi } from 'features/business/api';

import { useFilters } from 'hooks/useFilters';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SearchFilter } from 'pages/@common/search-filter';
import { AnyRecord } from 'types/general';

export const Business = () => {
  const businessApi = useBusinessApi().getAll;

  const onRefresh = (filters: AnyRecord) => businessApi.fetch({ filters });

  const filters = useFilters<{ search?: string; page?: number }>({
    onChange: (filters) => onRefresh(filters),
  });

  return (
    <LayoutPage title="Todas las tiendas">
      <LayoutPageSection>
        <div className="flex justify-end">
          <SearchFilter
            isBusy={businessApi.status.isBusy}
            onChange={(search) => filters.onMergeFilters({ search })}
            value={filters.value.search}
          />
        </div>

        <CardGroup className="mt-6">
          {businessApi.data?.map(({ name, category, routeName }, index) => {
            return (
              <BusinessCardSimple
                key={index}
                href={`/${routeName}`}
                name={name}
                category={category}
              />
            );
          })}
        </CardGroup>

        <Pagination
          className="w-full mt-6"
          paginator={businessApi?.paginator}
          onChange={({ page }) => filters.onMergeFilters({ page })}
        />
      </LayoutPageSection>
    </LayoutPage>
  );
};
