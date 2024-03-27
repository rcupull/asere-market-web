import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { ButtonSave } from 'components/button-save';
import { IconButtonRemove } from 'components/icon-button-remove ';
import { IconButtonShowHide } from 'components/icon-button-show-hide';
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
                  Al eliminar esta sección solo serán borrados los datos asociados a la misma de
                  manera <span className="font-bold">permanente</span>. Las publicaciones{' '}
                  <span className="font-bold">no</span> serán eliminadas. Seguro que desea eliminar
                  esta sección?
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

  const handleShowHide = (hidden: boolean) => {
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
                  Al <span className="font-bold">{`${hidden ? 'ocultar' : 'mostrar'}`}</span> esta
                  sección {`${hidden ? 'no' : ''}`}será visible para los usuario en la página de su
                  negocio. Las publicaciones, configuraciones y demás no sufrirán ningun cambio.
                  Seguro que desea {`${hidden ? 'ocultar' : 'mostrar'} `}
                  esta sección?
                </span>
              </div>
            ),
            badge: <Badge variant="error" />,
            primaryBtn: (
              <ButtonSave
                isBusy={businessOwnerUpdate.status.isBusy}
                onClick={() => {
                  businessOwnerUpdate.updatePostsLayoutSection(
                    { routeName, sectionId: rowData._id, value: { hidden } },
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

  return (
    <RowActionsContainer>
      <IconButtonRemove onClick={handleDelete} />
      <IconButtonShowHide hidden={rowData.hidden} onClick={() => handleShowHide(!rowData.hidden)} />
      <IconButtonUpdate onClick={handleUpdate} />
    </RowActionsContainer>
  );
};
