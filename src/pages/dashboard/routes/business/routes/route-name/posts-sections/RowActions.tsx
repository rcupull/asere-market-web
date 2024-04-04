import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { IconButtonRemove } from 'components/icon-button-remove ';
import { IconButtonUpdate } from 'components/icon-button-update';

import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { useBusinessOwnerUpdate } from 'pages/@hooks/useBusinessOwnerUpdate';
import { PostsLayoutSection } from 'types/business';

export interface RowActionsProps {
  rowData: PostsLayoutSection;
  routeName: string;
  callAfarResources?: CallAfarResources;
}
export const RowActions = ({ rowData, callAfarResources, routeName }: RowActionsProps) => {
  const { pushModal } = useModal();

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const businessOwnerUpdate = useBusinessOwnerUpdate();

          const { onClose } = useModal();
          const { onCallAfar } = useCallFromAfar();
          return {
            content: (
              <div>
                <span>
                  Al eliminar este grupo solo serán borrados los datos asociados al mismo de forma{' '}
                  <span className="font-bold">permanente</span>. Las publicaciones{' '}
                  <span className="font-bold">no</span> serán eliminadas. Seguro que desea eliminar
                  este grupo?
                </span>
              </div>
            ),
            badge: <Badge variant="error" />,
            primaryBtn: (
              <ButtonRemove
                isBusy={businessOwnerUpdate.status.isBusy}
                onClick={() => {
                  businessOwnerUpdate.removePostsLayoutSection(
                    { routeName, sectionId: rowData._id },
                    {
                      onAfterSuccess: () => {
                        onClose();
                        onCallAfar(callAfarResources);
                      },
                    },
                  );
                }}
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  const handleUpdate = () => {
    pushModal('PostsSectionNew', {
      routeName,
      sectionId: rowData._id,
      callAfarResources,
    });
  };

  return (
    <RowActionsContainer>
      <IconButtonRemove onClick={handleDelete} />
      <IconButtonUpdate onClick={handleUpdate} />
    </RowActionsContainer>
  );
};
