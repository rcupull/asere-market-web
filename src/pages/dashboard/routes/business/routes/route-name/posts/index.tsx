import { useEffect, useState } from 'react';

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

import { TopActions } from 'pages/@common/top-actions';
import { useBusinessOwnerData } from 'pages/@hooks/useBusinessOwnerData';
import { useTableCellCategoriesTags } from 'pages/@hooks/useTableCellCategoriesTags';
import { GetAllPostsQuery } from 'types/api';
import { Business } from 'types/business';
import { Post } from 'types/post';
import { getDateString } from 'utils/date';

export interface PostsProps {
  business: Business;
}

export const Posts = ({ business }: PostsProps) => {
  const { getAllUserPosts } = useGetAllUserPosts();
  const { pushModal } = useModal();
  const { routeName } = business;

  const [data, setData] = useState<Array<Post>>([]);

  const businessOwnerData = useBusinessOwnerData();

  useEffect(() => {
    if (getAllUserPosts.paginator && getAllUserPosts.data) {
      const { page } = getAllUserPosts.paginator;

      if (page === 1) {
        setData([...getAllUserPosts.data]);
      } else {
        setData([...data, ...getAllUserPosts.data]);
      }
    }
  }, [getAllUserPosts.data]);

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
              heads={getBulkHeaderNodes([
                null,
                'Nombre',
                'Descripción',
                'Categorías',
                'Precio',
                'Fecha de Creación',
              ])}
              getRowProps={(rowData) => {
                const { name, createdAt, description, currency, price, postCategoriesTags } =
                  rowData;

                return {
                  nodes: getBulkRowNodes({ rowData }, [
                    <RowActions
                      key="RowActions"
                      rowData={rowData}
                      routeName={routeName}
                      callAfarResources={callAfarResources}
                    />,
                    name,
                    description,
                    tableCellCategoriesTags.onGetTableCellNode({ postCategoriesTags }),
                    <span key="price" className="text-nowrap">{`${price} ${currency}`}</span>,
                    getDateString({ date: createdAt, showTime: true }),
                  ]),
                };
              }}
              data={data}
              onScrollBottom={() => {
                if (getAllUserPosts.paginator) {
                  const { page, hasNextPage } = getAllUserPosts.paginator;

                  if (hasNextPage) {
                    filters.onMergeFilters({ page: page + 1 });
                  }
                }
              }}
              isBusyBottom={getAllUserPosts.status.isBusy}
            />
          </>
        )}
      </BulkActions>
    </div>
  );
};
