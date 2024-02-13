import { useEffect } from 'react';

import { ButtonNew } from 'components/button-new';
import { ButtonRefresh } from 'components/button-refresh';
import { Table } from 'components/table';

import { useUserBusinessApi } from 'features/api/useUserBusinessApi';
import { useUserPaymentApi } from 'features/api/useUserPaymentApi';
import { useModal } from 'features/modal';
import { useRouter } from 'features/router';

import { useHiddenBusinessControl } from 'hooks/useHiddenBusinessControl';

import { RowActions } from './RowActions';

import { LayoutSection } from 'pages/@common/layout-section';
import { LayoutSectionSub } from 'pages/@common/layout-section-sub';
import { TableTopActions } from 'pages/dashboard/components/table-top-actions';
import { getDateString } from 'utils/date';
import { isNumber } from 'utils/general';

export const DashboardBusiness = () => {
  const { getAllUserBussiness } = useUserBusinessApi();

  const { pushModal } = useModal();
  const { pushRoute, pathname } = useRouter();

  const onRefresh = () => getAllUserBussiness.fetch({});

  const { getCurrentPaymentPlan } = useUserPaymentApi();

  useEffect(() => {
    onRefresh();
    getCurrentPaymentPlan.fetch(undefined);
  }, []);

  const hiddenBusinessControl = useHiddenBusinessControl({
    onRefresh,
    fetchStatus: getAllUserBussiness.status,
  });

  const canNotAddNewBusiness =
    isNumber(getAllUserBussiness.data?.length) &&
    isNumber(getCurrentPaymentPlan.data?.maxBusinessCount) &&
    getAllUserBussiness.data?.length >= getCurrentPaymentPlan.data?.maxBusinessCount;

  return (
    <LayoutSection title="Negocios">
      <LayoutSectionSub>
        <TableTopActions>
          {hiddenBusinessControl.submitBtn}

          <ButtonNew
            label="Nuevo negocio"
            needPremium={canNotAddNewBusiness}
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
