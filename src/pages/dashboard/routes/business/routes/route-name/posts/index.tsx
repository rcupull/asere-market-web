import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Divider } from 'components/divider';
import { Table } from 'components/table';

import { useGetAllUserPosts } from 'features/api/useGetAllUserPosts';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

import { BulkActions } from './BulkActions';
import { Filters } from './Filters';
import { RowActions } from './RowActions';
import { useInfinityScrolling } from './useInfinityScrolling';

import { TopActions } from 'pages/@common/top-actions';
import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';
import { useTableCellCategoriesTags } from 'pages/@hooks/useTableCellCategoriesTags';
import { GetAllPostsQuery } from 'types/api';
import { Business } from 'types/business';
import { getDateString } from 'utils/date';
import { viewUtils } from 'utils/view';

export interface PostsProps {
  business: Business;
}

export const Posts = ({ business }: PostsProps) => {
  const { getAllUserPosts } = useGetAllUserPosts();
  const { pushModal } = useModal();
  const { routeName } = business;

  const businessOwnerData = useBusinessOwnerData();

  const infinityScrolling = useInfinityScrolling({
    fetchPaginatedResources: getAllUserPosts,
    onFetch: ({ page }) => filters.onMergeFilters({ page }),
  });

  const filters = useFiltersVolatile<GetAllPostsQuery>({
    onChange: (filters) => getAllUserPosts.fetch({ routeNames: [routeName], ...filters }),
  });

  useEffect(() => {
    filters.onRefresh();
  }, []);

  const { isNotValidPostsCountByBussines } = useGetUserPaymentPlan();

  const callAfarResources = 'dashboard_business_route-name_posts_onRefresh';
  useCallFromAfar(callAfarResources, () => {
    filters.onMergeFilters({ page: 1 }, { forceFetch: true });
  });

  const tableCellCategoriesTags = useTableCellCategoriesTags({
    business,
  });

  return (
    <div className="h-full flex flex-col">
      <BulkActions
        business={businessOwnerData.data}
        onRefresh={() => filters.onMergeFilters({ page: 1 }, { forceFetch: true })}
        filters={filters.value}
      >
        {({ getBulkHeaderNodes, getBulkRowNodes, getBulkTopActionsNode }) => (
          <>
            {getBulkTopActionsNode(
              <TopActions>
                <ButtonNew
                  label="Nueva publicación"
                  needPremium={isNotValidPostsCountByBussines(getAllUserPosts.data?.length)}
                  onClick={() =>
                    pushModal('PostNew', {
                      routeName,
                      callAfarResources,
                    })
                  }
                  className="ml-auto"
                />

                <ButtonRefresh onClick={filters.onRefresh} isBusy={getAllUserPosts.status.isBusy} />
              </TopActions>,
            )}

            <Divider className="!my-3" />

            <Filters
              business={businessOwnerData.data}
              onChange={(filtersValue) => filters.onMergeFilters(filtersValue)}
              value={filters.value}
            />

            <Divider className="!my-3" />

            <Table
              className="!max-h-[calc(100vh-25rem)]"
              heads={getBulkHeaderNodes([
                null,
                'Nombre',
                'Categorías',
                'Fecha de Creación',
                'Detalles',
              ])}
              getRowProps={(rowData) => {
                const { name, createdAt, currency, price, postCategoriesTags, hidden } = rowData;

                return {
                  nodes: getBulkRowNodes({ rowData }, [
                    <RowActions
                      key="RowActions"
                      rowData={rowData}
                      routeName={routeName}
                      callAfarResources={callAfarResources}
                    />,
                    name,
                    tableCellCategoriesTags.onGetTableCellNode({ postCategoriesTags }),
                    getDateString({ date: createdAt, showTime: true }),
                    viewUtils.keyValueList([
                      {
                        label: 'Visible',
                        value: hidden ? 'Si' : 'No',
                      },
                      {
                        label: 'Precio',
                        value: `${price} ${currency}`,
                      },
                    ]),
                  ]),
                };
              }}
              data={infinityScrolling.tableData}
              onScrollBottom={infinityScrolling.onScrollBottom}
              isBusy={getAllUserPosts.status.isBusy}
            />
          </>
        )}
      </BulkActions>
    </div>
  );
};
