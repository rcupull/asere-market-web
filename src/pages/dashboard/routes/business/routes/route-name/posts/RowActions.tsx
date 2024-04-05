import { Badge } from 'components/badge';
import { ButtonRemove } from 'components/button-remove';
import { ButtonSave } from 'components/button-save';
import { IconButtonDuplicate } from 'components/icon-button-duplicate';
import { IconButtonRemove } from 'components/icon-button-remove ';
import { IconButtonShowHide } from 'components/icon-button-show-hide';
import { IconButtonUpdate } from 'components/icon-button-update';
import { IconButtonView } from 'components/icon-button-view';

import { useDuplicateOneUserPost } from 'features/api/useDuplicateOneUserPost';
import { useRemoveOneUserPost } from 'features/api/useRemoveOneUserPost';
import { useUpdateOneUserPost } from 'features/api/useUpdateOneUserPost';
import { useModal } from 'features/modal/useModal';

import { CallAfarResources, useCallFromAfar } from 'hooks/useCallFromAfar';
import { useRouter } from 'hooks/useRouter';

import { RowActionsContainer } from 'pages/@common/row-actions-container';
import { Post } from 'types/post';
import { getPostRoute } from 'utils/business';

export interface RowActionsProps {
  rowData: Post;
  routeName: string;
  callAfarResources?: CallAfarResources;
}
export const RowActions = ({ rowData, callAfarResources, routeName }: RowActionsProps) => {
  const { pushModal } = useModal();
  const { pushRoute } = useRouter();

  const { onCallAfar } = useCallFromAfar();

  const handleDelete = () => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { removeOneUserPost } = useRemoveOneUserPost();
          const { onClose } = useModal();
          const { onCallAfar } = useCallFromAfar();
          return {
            content: (
              <div>
                <span>
                  Al eliminar esta publicación seran borradas todas las imágenes y datos asociados
                  al mismo de manera <span className="font-bold">permanente</span>. Seguro que desea
                  eliminar esta publicación?
                </span>
              </div>
            ),
            badge: <Badge variant="warning" />,
            primaryBtn: (
              <ButtonRemove
                isBusy={removeOneUserPost.status.isBusy}
                onClick={() =>
                  removeOneUserPost.fetch(
                    { id: rowData._id },
                    {
                      onAfterSuccess: () => {
                        onClose();

                        onCallAfar(callAfarResources);
                      },
                    },
                  )
                }
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  const handleShowHide = (hidden: boolean) => {
    pushModal(
      'Confirmation',
      {
        useProps: () => {
          const { updateOneUserPost } = useUpdateOneUserPost();
          const { onClose } = useModal();
          const { onCallAfar } = useCallFromAfar();
          return {
            content: (
              <div>
                <span>
                  Al {`${hidden ? 'ocultar' : 'mostrar'}`} esta publicación no serán perdidos los
                  datos de la misma. Solo se controla la visibilidad en la página de su negocio.
                  Seguro que desea {`${hidden ? 'ocultar' : 'mostrar'}`} esta publicación?
                </span>
              </div>
            ),
            badge: <Badge variant="warning" />,
            primaryBtn: (
              <ButtonSave
                isBusy={updateOneUserPost.status.isBusy}
                label={hidden ? 'Ocultar' : 'Mostrar'}
                onClick={() =>
                  updateOneUserPost.fetch(
                    { postId: rowData._id, hidden },
                    {
                      onAfterSuccess: () => {
                        onClose();
                        onCallAfar(callAfarResources);
                      },
                    },
                  )
                }
              />
            ),
          };
        },
      },
      { emergent: true },
    );
  };

  const { duplicateOneUserPost } = useDuplicateOneUserPost();

  const handleDuplicate = () => {
    duplicateOneUserPost.fetch(
      {
        postId: rowData._id,
      },
      {
        onAfterSuccess: () => {
          onCallAfar(callAfarResources);
        },
      },
    );
  };

  const handleUpdate = () => {
    pushModal('PostNew', {
      routeName,
      postId: rowData._id,
      callAfarResources,
    });
  };

  return (
    <RowActionsContainer>
      <IconButtonRemove onClick={handleDelete} />
      <IconButtonShowHide hidden={rowData.hidden} onClick={() => handleShowHide(!rowData.hidden)} />
      <IconButtonUpdate onClick={handleUpdate} />
      <IconButtonDuplicate onClick={handleDuplicate} />

      <IconButtonView
        stopPropagation
        onClick={() => pushRoute(getPostRoute({ routeName, postId: rowData._id }))}
      />
    </RowActionsContainer>
  );
};
