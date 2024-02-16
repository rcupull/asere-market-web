import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllUserPosts } from 'features/api/useGetAllUserPosts';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useHiddenPostControl } from 'hooks/useHiddenPostsControl';

import { RowActions } from './RowActions';

import { updateIds } from 'constants/updateids';
import { TopActions } from 'pages/dashboard/components/top-actions';
import { Business } from 'types/business';
import { getDateString } from 'utils/date';

export interface TablePostsProps {
  business: Business;
}

export const TablePosts = ({ business }: TablePostsProps) => {
  const { getAllUserPosts } = useGetAllUserPosts();
  const { pushModal } = useModal();
  const { routeName } = business;

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => getAllUserPosts.fetch({ routeNames: [routeName] });

  const hiddenPostControl = useHiddenPostControl({
    onRefresh,
    fetchStatus: getAllUserPosts.status,
  });

  const { isNotValidPostsCountByBussines } = useGetUserPaymentPlan();

  useCallFromAfar(updateIds.dashboard_business_route_name_table_posts, onRefresh);

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
              updateIds: [updateIds.dashboard_business_route_name_table_posts],
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
        heads={[null, 'Nombre', 'Descripción', 'Precio', 'Moneda', 'Fecha de Creación']}
        getRowProps={(rowData) => {
          const { name, createdAt, description, currency, price } = rowData;

          return {
            className: hiddenPostControl.onGetHiddenTableRowStyles(rowData),
            nodes: [
              <RowActions
                key="RowActions"
                rowData={rowData}
                routeName={routeName}
                hiddenPostControl={hiddenPostControl}
                updateIds={[updateIds.dashboard_business_route_name_table_posts]}
              />,
              name,
              description,
              price,
              currency,
              getDateString({ date: createdAt, showTime: true }),
            ],
          };
        }}
        data={getAllUserPosts.data}
      />
    </>
  );
};
