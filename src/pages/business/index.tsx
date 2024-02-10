import { useEffect, useState } from 'react';

import { BusinessCardSimple } from 'components/business-card-simple';
import { Pagination } from 'components/pagination';
import { ProductsGroup } from 'components/products-group';

import { useBusinessApi } from 'features/business/api';

import { LayoutSectionSub } from 'pages/@common/layout-section-sub';
import { LayoutSingle } from 'pages/@common/layout-single';
import { SearchFilter } from 'pages/@common/search-filter';
import { AnyRecord } from 'types/general';

export const Business = () => {
  const [filters, setFilters] = useState({});

  const businessApis = useBusinessApi();

  useEffect(() => {
    businessApis.getAll.fetch({});
  }, []);

  const handleChangeFilters = (partialFilter: AnyRecord) => {
    const newFilters = { ...filters, ...partialFilter };
    setFilters(newFilters);
    businessApis.getAll.fetch({ filters: newFilters });
  };

  return (
    <LayoutSingle title="Todas las tiendas">
      <div>
        <div className="flex">
          <SearchFilter
            className="ml-auto"
            isBusy={businessApis.getAll.status.isBusy}
            onChange={(search) => handleChangeFilters({ search })}
          />
        </div>
        <LayoutSectionSub>
          <ProductsGroup>
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
          </ProductsGroup>
        </LayoutSectionSub>

        <Pagination
          className="w-full mt-6"
          paginator={businessApis.getAll?.paginator}
          onChange={({ page }) => handleChangeFilters({ page })}
        />
      </div>
    </LayoutSingle>
  );
};
