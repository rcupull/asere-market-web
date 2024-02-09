import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove ';
import { IconButtonView } from 'components/icon-button-view';

import { useBusinessApi } from 'features/business/api';
import { useModal } from 'features/modal';
import { useRouter } from 'features/router';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { Business } from 'types/business';

export interface RowActionsProps {
  rowData: Business;
  onRefresh: () => void;
}
export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();

  const handleDelete = () => {
    pushModal('Confirmation', {
      useProps: () => {
        const businessApi = useBusinessApi();
        const { onClose } = useModal();

        return {
          content: 'Seguro que desea eliminar este negocio?',
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              isBusy={businessApi.removeOne.status.isBusy}
              onClick={() =>
                businessApi.removeOne.fetch(
                  { id: rowData._id },
                  {
                    onAfterSuccess: () => {
                      onClose();
                      onRefresh();
                    },
                  },
                )
              }
            />
          ),
        };
      },
    });
  };

  return (
    <RowActionsContainer>
      <IconButtonRemove stopPropagation onClick={handleDelete} />
      <IconButtonView
        title="Ver página"
        stopPropagation
        onClick={() => pushRoute(rowData.routeName)}
      />
    </RowActionsContainer>
  );
};
