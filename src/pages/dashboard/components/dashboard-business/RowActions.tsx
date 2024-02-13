import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove ';
import { IconButtonShowHide } from 'components/icon-button-show-hide';
import { IconButtonView } from 'components/icon-button-view';

import { useRemoveOneUserBusiness } from 'features/api/useRemoveOneUserBusiness';
import { useModal } from 'features/modal';
import { useRouter } from 'features/router';

import { HiddenBusinessControl } from 'hooks/useHiddenBusinessControl';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { Business } from 'types/business';

export interface RowActionsProps {
  rowData: Business;
  onRefresh: () => void;
  hiddenBusinessControl: HiddenBusinessControl;
}
export const RowActions = ({ rowData, onRefresh, hiddenBusinessControl }: RowActionsProps) => {
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();

  const handleDelete = () => {
    pushModal('Confirmation', {
      useProps: () => {
        const { removeOneUserBusiness } = useRemoveOneUserBusiness();
        const { onClose } = useModal();

        return {
          content: 'Seguro que desea eliminar este negocio?',
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              isBusy={removeOneUserBusiness.status.isBusy}
              onClick={() =>
                removeOneUserBusiness.fetch(
                  { routeName: rowData.routeName },
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
      <IconButtonShowHide stopPropagation {...hiddenBusinessControl.onGetHiddenButtonProp(rowData)} />

    </RowActionsContainer>
  );
};
