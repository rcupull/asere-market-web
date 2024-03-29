import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllUserPosts } from 'features/api/useGetAllUserPosts';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useModal } from 'features/modal/useModal';

import { callAfarIds, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useHiddenPostControl } from 'hooks/useHiddenPostsControl';

import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { useTableCellCategoriesTags } from 'pages/@hooks/useTableCellCategoriesTags';
import { Business } from 'types/business';
import { getDateString } from 'utils/date';

export interface PostsProps {
  business: Business;
}

export const Posts = ({ business }: PostsProps) => {
  const { getAllUserPosts } = useGetAllUserPosts();
  const { pushModal } = useModal();
  const { routeName } = business;

  useEffect(() => {
    onRefresh();
  }, [routeName]);

  const onRefresh = () => getAllUserPosts.fetch({ routeNames: [routeName] });

  const hiddenPostControl = useHiddenPostControl({
    onRefresh,
    fetchStatus: getAllUserPosts.status,
  });

  const { isNotValidPostsCountByBussines } = useGetUserPaymentPlan();

  useCallFromAfar(callAfarIds.dashboard_business_route_name_table_posts, onRefresh);

  const tableCellCategoriesTags = useTableCellCategoriesTags({
    business,
  });

  return (
    <>
      <TopActions>
        {hiddenPostControl.submitBtn}
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

        <ButtonRefresh
          onClick={hiddenPostControl.onRefresh}
          isBusy={getAllUserPosts.status.isBusy}
        />
      </TopActions>
      <Table
        heads={[null, 'Nombre', 'Descripción', 'Categorías', 'Precio', 'Fecha de Creación']}
        getRowProps={(rowData) => {
          const { name, createdAt, description, currency, price, postCategoriesTags } = rowData;

          return {
            className: hiddenPostControl.onGetHiddenTableRowStyles(rowData),
            nodes: [
              <RowActions
                key="RowActions"
                rowData={rowData}
                routeName={routeName}
                hiddenPostControl={hiddenPostControl}
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
        data={getAllUserPosts.data}
      />
    </>
  );
};
