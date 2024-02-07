import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { Table } from 'components/table';

import { useModal } from 'features/modal';
import { usePostsApi } from 'features/post/api';

import { RowActions } from './RowActions';

import { TableTopActions } from 'pages/dashboard/components/table-top-actions';

export interface TablePostsProps {
  businessId: string;
}

export const TablePosts = ({ businessId }: TablePostsProps) => {
  const postsApi = usePostsApi();
  const { pushModal } = useModal();

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => postsApi.getAll.fetch({ businessIds: [businessId] });

  return (
    <>
      <TableTopActions>
        <ButtonNew
          label="Nuevo post"
          onClick={() =>
            pushModal('PostNew', {
              businessId,
              onAfterSuccess: () => onRefresh(),
            })
          }
          className="ml-auto"
        />
      </TableTopActions>
      <Table
        heads={[
          null,
          'Nombre',
          'Descripión',
          'Moneda',
          'Precio',
          'Disponibilidad',
          'Fecha de Creación',
        ]}
        getRowProps={(rowData) => {
          const { name, createdAt, description, currency, price, amountAvailable } = rowData;

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} onRefresh={onRefresh} />,
              name,
              description,
              currency,
              price,
              amountAvailable,
              createdAt,
            ],
          };
        }}
        data={postsApi.getAll.data}
      />
    </>
  );
};
