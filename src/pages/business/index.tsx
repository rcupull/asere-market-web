import { BusinessCardSimple } from 'components/business-card-simple';
import { CardGroup } from 'components/card-group';
import { Pagination } from 'components/pagination';

import { useGetBusinessAll } from 'features/api/useGetBusinessAll';

import { useFilters } from 'hooks/useFilters';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SearchFilter } from 'pages/@common/search-filter';
import { AnyRecord } from 'types/general';
import { getBusinessRoute } from 'utils/business';

export const Business = () => {
  const {getBusinessAll} = useGetBusinessAll();

  const onRefresh = (filters: AnyRecord) => getBusinessAll.fetch({ filters });

  const filters = useFilters<{ search?: string; page?: number }>({
    onChange: (filters) => onRefresh(filters),
  });

  return (
    <LayoutPage title="Todas las tiendas">
      <LayoutPageSection>
        <div className="flex justify-end">
          <SearchFilter
            isBusy={getBusinessAll.status.isBusy}
            onChange={(search) => filters.onMergeFilters({ search })}
            value={filters.value.search}
          />
        </div>

        <CardGroup className="mt-6">
          {getBusinessAll.data?.map(({ name, category, routeName }, index) => {
            return (
              <BusinessCardSimple
                key={index}
                href={getBusinessRoute({ routeName })}
                name={name}
                category={category}
              />
            );
          })}
        </CardGroup>

        <Pagination
          className="w-full mt-6"
          paginator={getBusinessAll?.paginator}
          onChange={({ page }) => filters.onMergeFilters({ page })}
        />
      </LayoutPageSection>
    </LayoutPage>
  );
};
