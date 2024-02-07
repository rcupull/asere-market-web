import { useEffect } from 'react';

import { Button } from 'components/button';
import { Table } from 'components/table';

import { useBusinessApi } from 'features/business/api';
import { useModal } from 'features/modal';
import { useRouter } from 'features/router';

import { RowActions } from './RowActions';

import { LayoutSection } from 'pages/@common/layout-section';
import { TableTopActions } from 'pages/dashboard/components/table-top-actions';

export const SectionBusiness = () => {
  const businessApi = useBusinessApi();

  const { pushModal } = useModal();
  const { pushRoute, pathname } = useRouter();

  const onRefresh = () => businessApi.getAll.fetch(undefined);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <LayoutSection title='Negocios'>
      <TableTopActions>
        <Button
          label="Nuevo negocio"
          onClick={() =>
            pushModal('BusinessNew', {
              onAfterSuccess: onRefresh,
            })
          }
          className="ml-auto"
        />
      </TableTopActions>
      <Table
        heads={[null, 'Nombre', 'Category', 'Fecha de Creación']}
        getRowProps={(rowData) => {
          const { name, category, createdAt, _id } = rowData;

          return {
            onClick: () => pushRoute(`${pathname}/${_id}`),
            nodes: [
              <RowActions key="RowActions" rowData={rowData} onRefresh={onRefresh} />,
              name,
              category,
              createdAt,
            ],
          };
        }}
        data={businessApi.getAll.data}
      />
    </LayoutSection>
  );
};
