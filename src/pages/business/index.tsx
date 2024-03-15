import { BusinessCardSimple } from 'components/business-card-simple';
import { CardGroup } from 'components/card-group';
import { Pagination } from 'components/pagination';

import { useGetAllBusiness } from 'features/api/useGetAllBusiness';

import { useFilters } from 'hooks/useFilters';

import { SearchFilter } from 'pages/@common/filters/search-filter';
import { LayoutPage } from 'pages/@common/layout-page';
import { LayoutPageSection } from 'pages/@common/layout-page-section';
import { AnyRecord } from 'types/general';
import { getImageEndpoint } from 'utils/api';
import { getBusinessRoute } from 'utils/business';

export const Business = () => {
  const { getAllBusiness } = useGetAllBusiness();

  const onRefresh = (filters: AnyRecord) => getAllBusiness.fetch({ filters });

  const filters = useFilters<{ search?: string; page?: number }>({
    onChange: (filters) => onRefresh(filters),
  });

  return (
    <LayoutPage title="Tiendas">
      <LayoutPageSection>
        <div className="flex justify-end">
          <SearchFilter
            isBusy={getAllBusiness.status.isBusy}
            onChange={(search) => filters.onMergeFilters({ search })}
            value={filters.value.search}
          />
        </div>

        <CardGroup className="mt-6">
          {getAllBusiness.data?.map((business, index) => {
            return (
              <BusinessCardSimple
                key={index}
                business={business}
                href={getBusinessRoute({ routeName: business.routeName })}
                getImageSrc={getImageEndpoint}
              />
            );
          })}
        </CardGroup>

        <Pagination
          className="w-full mt-6"
          paginator={getAllBusiness?.paginator}
          onChange={({ page }) => filters.onMergeFilters({ page })}
        />
      </LayoutPageSection>
    </LayoutPage>
  );
};
