import { useEffect } from 'react';

import { BusinessCardSimple } from 'components/business-card-simple';
import { CardGroup } from 'components/card-group';
import { Pagination } from 'components/pagination';

import { useBusinessApi } from 'features/business/api';

import { useFilters } from 'hooks/useFilters';

import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { SearchFilter } from 'pages/@common/search-filter';

export const Business = () => {
  const businessApis = useBusinessApi();

  useEffect(() => {
    businessApis.getAll.fetch({});
  }, []);

  const filters = useFilters({
    onChange: (filters) => businessApis.getAll.fetch({ filters }),
  });

  return (
    <LayoutPage title="Todas las tiendas">
      <LayoutPageSection>
        <div className="flex justify-end">
          <SearchFilter
            isBusy={businessApis.getAll.status.isBusy}
            onChange={(search) => filters.onMergeFilters({ search })}
          />
        </div>

        <CardGroup className="mt-6">
          {businessApis.getAll.data?.map(({ name, category, routeName }, index) => {
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
          paginator={businessApis.getAll?.paginator}
          onChange={({ page }) => filters.onMergeFilters({ page })}
        />
      </LayoutPageSection>
    </LayoutPage>
  );
};
