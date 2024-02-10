import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useModal } from 'features/modal';
import { usePostsApi } from 'features/post/api';

import { RowActions } from './RowActions';

import { TableTopActions } from 'pages/dashboard/components/table-top-actions';
import { getDateString } from 'utils/date';

export interface TablePostsProps {
  routeName: string;
}

export const TablePosts = ({ routeName }: TablePostsProps) => {
  const postsApi = usePostsApi();
  const { pushModal } = useModal();

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => postsApi.getAll.fetch({ routeNames: [routeName] });

  return (
    <>
      <TableTopActions>
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

        <ButtonRefresh onClick={onRefresh} />
      </TableTopActions>
      <Table
        heads={[null, 'Nombre', 'Descripción', 'Precio', 'Moneda', 'Fecha de Creación']}
        getRowProps={(rowData) => {
          const { name, createdAt, description, currency, price } = rowData;

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} onRefresh={onRefresh} />,
              name,
              description,
              price,
              currency,
              getDateString({ date: createdAt, showTime: true }),
            ],
          };
        }}
        data={postsApi.getAll.data}
      />
    </>
  );
};
