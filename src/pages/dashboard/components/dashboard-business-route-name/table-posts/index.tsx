import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useUserPostsApi } from 'features/api/useUserPostsApi';
import { useModal } from 'features/modal';

import { useHiddenPostControl } from 'hooks/useHiddenPostsControl';

import { RowActions } from './RowActions';

import { TableTopActions } from 'pages/dashboard/components/table-top-actions';
import { getDateString } from 'utils/date';

export interface TablePostsProps {
  routeName: string;
}

export const TablePosts = ({ routeName }: TablePostsProps) => {
  const { getAllUserPosts } = useUserPostsApi();
  const { pushModal } = useModal();

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => getAllUserPosts.fetch({ routeNames: [routeName] });

  const hiddenPostControl = useHiddenPostControl({
    onRefresh,
    fetchStatus: getAllUserPosts.status,
  });

  return (
    <>
      <TableTopActions>
        {hiddenPostControl.submitBtn}
        <ButtonNew
          label="Nueva publicación"
          onClick={() =>
            pushModal('PostNew', {
              routeName,
              onAfterSuccess: () => onRefresh(),
            })
          }
          className="ml-auto"
        />

        <ButtonRefresh
          onClick={hiddenPostControl.onRefresh}
          isBusy={getAllUserPosts.status.isBusy}
        />
      </TableTopActions>
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
                onRefresh={onRefresh}
                routeName={routeName}
                hiddenPostControl={hiddenPostControl}
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
