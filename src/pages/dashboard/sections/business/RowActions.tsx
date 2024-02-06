import { Button } from 'components/button';

import { useBusinessApi } from 'features/business/api';
import { useModal } from 'features/modal';

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
        const { removeOne } = useBusinessApi();
        const { onClose } = useModal();

        return {
          content: 'Seguro que desea eliminar este negocio?',
          primaryBtn: (
            <Button
              label="Eliminar"
              isBusy={removeOne.status.isBusy}
              onClick={() =>
                removeOne.fetch(
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
    <div>
      <Button label="Remove" onClick={handleDelete} variant="error" />
    </div>
  );
};
