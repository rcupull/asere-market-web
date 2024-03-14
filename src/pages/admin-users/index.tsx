import { useEffect } from 'react';

import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllAdminUsers } from 'features/api/useGetAllAdminUsers';

import { PaymentHistory } from './PaymentHistory';
import { RowActions } from './RowActions';

import { TopActions } from 'pages/@common/top-actions';
import { User } from 'types/auth';
import { getDateString } from 'utils/date';

export const AdminUsers = () => {
  const { getAllAdminUsers } = useGetAllAdminUsers();

  const onRefresh = () => getAllAdminUsers.fetch(undefined);
  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <>
      <TopActions>
        <ButtonRefresh onClick={onRefresh} isBusy={getAllAdminUsers.status.isBusy} />
      </TopActions>

      <Table<User>
        heads={[null, 'Nombre', 'Email', 'Plan Contratado', 'Fecha de Creación']}
        getRowProps={(rowData) => {
          const { name, createdAt, email, payment } = rowData;

          return {
            nodes: [
              <RowActions key="RowActions" rowData={rowData} />,
              name,
              email,
              <PaymentHistory key="PaymentHistory" payment={payment} />,
              getDateString({ date: createdAt, showTime: true }),
            ],
          };
        }}
        data={getAllAdminUsers.data}
      />
    </>
  );
};
