import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove ';

import { useModal } from 'features/modal';
import { useUserApi } from 'features/user/api';

import { Business } from 'types/business';

export interface RowActionsProps {
  rowData: Business;
  onRefresh: () => void;
}
export const RowActions = ({ rowData, onRefresh }: RowActionsProps) => {
  const { pushModal } = useModal();

  const handleDelete = () => {
    pushModal('Confirmation', {
      useProps: () => {
        const userApi = useUserApi();
        const { onClose } = useModal();

        return {
          content: 'Seguro que desea eliminar este negocio?',
          badge: <Badge variant="error" />,
          primaryBtn: (
            <ButtonRemove
              isBusy={userApi.removeOneBusiness.status.isBusy}
              onClick={() =>
                userApi.removeOneBusiness.fetch(
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
    <div>
      <IconButtonRemove onClick={handleDelete} />
    </div>
  );
};
