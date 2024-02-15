import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useModal } from 'features/modal';
import { useRouter } from 'features/router';

import { useHiddenBusinessControl } from 'hooks/useHiddenBusinessControl';

import { RowActions } from './RowActions';

import { LayoutSection } from 'pages/@common/layout-section';
import { LayoutSectionSub } from 'pages/@common/layout-section-sub';
import { TableTopActions } from 'pages/dashboard/components/table-top-actions';
import { getDateString } from 'utils/date';

export const DashboardBusiness = () => {
  const { getAllUserBussiness } = useGetAllUserBusiness();

  const { pushModal } = useModal();
  const { pushRoute, pathname } = useRouter();

  const onRefresh = () => getAllUserBussiness.fetch({});

  const { isNotValidBussinessCountByUser } = useGetUserPaymentPlan();

  useEffect(() => {
    onRefresh();
  }, []);

  const hiddenBusinessControl = useHiddenBusinessControl({
    onRefresh,
    fetchStatus: getAllUserBussiness.status,
  });

  return (
    <LayoutSection title="Negocios">
      <LayoutSectionSub>
        <TableTopActions>
          {hiddenBusinessControl.submitBtn}

          <ButtonNew
            label="Nuevo negocio"
            needPremium={isNotValidBussinessCountByUser(getAllUserBussiness.data?.length)}
            onClick={() =>
              pushModal('BusinessNew', {
                onAfterSuccess: onRefresh,
              })
            }
            className="ml-auto"
          />

          <ButtonRefresh
            onClick={hiddenBusinessControl.onRefresh}
            isBusy={getAllUserBussiness.status.isBusy}
          />
        </TableTopActions>

        <Table
          heads={[null, 'Nombre', 'Categoría', 'Fecha de creación']}
          getRowProps={(rowData) => {
            const { name, category, createdAt, routeName } = rowData;

            return {
              className: hiddenBusinessControl.onGetHiddenTableRowStyles(rowData),
              onClick: () => pushRoute(`${pathname}/${routeName}`),
              nodes: [
                <RowActions
                  key="RowActions"
                  rowData={rowData}
                  onRefresh={onRefresh}
                  hiddenBusinessControl={hiddenBusinessControl}
                />,
                name,
                category,
                getDateString({ date: createdAt, showTime: true }),
              ],
            };
          }}
          data={getAllUserBussiness.data}
        />
      </LayoutSectionSub>
    </LayoutSection>
  );
};
