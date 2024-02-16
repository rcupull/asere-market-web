import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useGetAllUserBusiness } from 'features/api/useGetAllUserBusiness';
import { useGetUserPaymentPlan } from 'features/api/useGetUserPaymentPlan';
import { useModal } from 'features/modal/useModal';

import { useCallFromAfar } from 'hooks/useCallFromAfar';
import { useHiddenBusinessControl } from 'hooks/useHiddenBusinessControl';
import { useRouter } from 'hooks/useRouter';

import { RowActions } from './RowActions';

import { updateIds } from 'constants/updateids';
import { LayoutSection } from 'pages/@common/layout-section';
import { LayoutSectionSub } from 'pages/@common/layout-section-sub';
import { TopActions } from 'pages/dashboard/components/top-actions';
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

  useCallFromAfar(updateIds.dashboard_business_table_business, onRefresh);

  return (
    <LayoutSection title="Negocios">
      <LayoutSectionSub>
        <TopActions>
          {hiddenBusinessControl.submitBtn}

          <ButtonNew
            label="Nuevo negocio"
            needPremium={isNotValidBussinessCountByUser(getAllUserBussiness.data?.length)}
            onClick={() =>
              pushModal('BusinessNew', {
                updateIds: [updateIds.dashboard_business_table_business],
              })
            }
            className="ml-auto"
          />

          <ButtonRefresh
            onClick={hiddenBusinessControl.onRefresh}
            isBusy={getAllUserBussiness.status.isBusy}
          />
        </TopActions>

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
