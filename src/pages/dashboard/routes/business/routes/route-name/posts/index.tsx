import { useEffect, useState } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { PostCategoriesFilterButtons } from 'components/post-categories-filter-buttons';
import { Table } from 'components/table';

import { useGetAllUserPosts } from 'features/api/useGetAllUserPosts';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useModal } from 'features/modal/useModal';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useFiltersVolatile } from 'hooks/useFiltersVolatile';

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

  useCallFromAfar(callAfarIds.dashboard_business_route_name_table_posts, () => {
    filters.onMergeFilters({ page: 1 });
  });

  const tableCellCategoriesTags = useTableCellCategoriesTags({
    business,
  });

  return (
    <div className="h-full flex flex-col">
      <TopActions>
        <ButtonNew
          label="Nueva publicación"
          needPremium={isNotValidPostsCountByBussines(getAllUserPosts.data?.length)}
          onClick={() =>
            pushModal('PostNew', {
              routeName,
              callAfarResources: callAfarIds.dashboard_business_route_name_table_posts,
            })
          }
          className="ml-auto"
        />

        <ButtonRefresh onClick={filters.onRefresh} isBusy={getAllUserPosts.status.isBusy} />
      </TopActions>

      <PostCategoriesFilterButtons
        postCategories={businessOwnerData.data?.postCategories}
        onChange={(postCategoriesTags) => filters.onMergeFilters({ page: 1, postCategoriesTags })}
        value={filters.value.postCategoriesTags}
        type="wrapped"
      />

      <Table
        className="mt-4"
        heads={[null, 'Nombre', 'Descripción', 'Categorías', 'Precio', 'Fecha de Creación']}
        getRowProps={(rowData) => {
          const { name, createdAt, description, currency, price, postCategoriesTags } = rowData;

          return {
            nodes: [
              <RowActions
                key="RowActions"
                rowData={rowData}
                routeName={routeName}
                callAfarResources={callAfarIds.dashboard_business_route_name_table_posts}
              />,
              name,
              description,
              tableCellCategoriesTags.onGetTableCellNode({ postCategoriesTags }),
              <span key="price" className="text-nowrap">{`${price} ${currency}`}</span>,
              getDateString({ date: createdAt, showTime: true }),
            ],
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
    </div>
  );
};
